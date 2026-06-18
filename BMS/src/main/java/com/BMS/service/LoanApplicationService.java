package com.BMS.service;

import com.BMS.DTO.EmployeeActionStat;
import com.BMS.DTO.LoanApplicationDto;
import com.BMS.DTO.LoanApplicationDtoPaginated;
import com.BMS.Exception.ResourceNotFoundException;
import com.BMS.enums.LoanStatus;
import com.BMS.mapper.LoanApplicationToDto;
import com.BMS.model.Account;
import com.BMS.model.Employee;
import com.BMS.model.Loan;
import com.BMS.model.LoanApplication;
import com.BMS.repository.AccountRepository;
import com.BMS.repository.LoanApplicationRepository;
import com.BMS.repository.LoanRepository;
import com.BMS.utility.FileUtility;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@AllArgsConstructor
public class LoanApplicationService {
    private final AccountService accountService;
    private final LoanApplicationRepository loanApplicationRepository;
    private final LoanApplicationToDto loanApplicationToDto;
    private final EmployeeService employeeService;
    private final LoanRepository loanRepository;

  private final LoanService loanService;
    private static final String UPLOAD_LOC = "D:/LoanApplicationFileUplaods";
    public  LoanApplication findApplicationById(int applicationId) {
       return loanApplicationRepository.findById(applicationId).orElseThrow(()->new ResourceNotFoundException("invalid application id"));
    }


    public LoanApplicationDto  createLoanApplication(LoanApplicationDto loanApplicationDto) {
        Account account=accountService.getAccountByAccountNumber(loanApplicationDto.disbursementAccount());
        System.out.println(account);
        LoanApplication loanApplication=loanApplicationToDto.mapDtoToLoanApplication(loanApplicationDto,account);
       LoanApplication loanApplication1= loanApplicationRepository.save(loanApplication);
      return loanApplicationToDto.mapLoanApplicationToDto(loanApplication1);

    }

    public void upload(String username, MultipartFile[] files, int appId) throws IOException {
        //  Fetch Officer Application
        LoanApplication loanApplication=findApplicationById(appId);
        String uniqueFolderName = username + "_files";
        Path userUploadDir = Paths.get(UPLOAD_LOC).resolve(uniqueFolderName);
        if (!Files.exists(userUploadDir)) {
            Files.createDirectories(userUploadDir);
        }
        for (MultipartFile file : files) {
            if (file.isEmpty()) continue; // Skip empty uploads
            FileUtility.validateFile(file);
            String fileName = file.getOriginalFilename();
            Path destinationPath = userUploadDir.resolve(fileName);
            Files.copy(file.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);
        }

        // Save the unique folder path (or directory name) in the DB
    loanApplication.setDocumentsPath(userUploadDir.toString());
        loanApplicationRepository.save(loanApplication);
    }

    public LoanApplicationDtoPaginated allPendingLoanApplications(int page, int size) {
        Pageable pageable= PageRequest.of(page,size);
       Page<LoanApplication> pages= loanApplicationRepository.findByStatus(LoanStatus.ONGOING,LoanStatus.PENDING,pageable);
      List<LoanApplicationDto> list=  pages.getContent().stream().map(k->loanApplicationToDto.mapLoanApplicationToDto(k)).toList();
      return new LoanApplicationDtoPaginated(pages.getTotalElements(),pages.getTotalPages(),list);
    }

    public void actionOnLoanApplication(LoanStatus loanStatus, String username, int applicationId) {
        LoanApplication loanApplication=findApplicationById(applicationId);
        Employee employee=employeeService.getEmpByUserName(username);
        loanApplication.setLoanStatus(loanStatus);
        loanApplication.setEmployee(employee);
        loanApplicationRepository.save(loanApplication);
        if(loanStatus.equals(LoanStatus.APPROVED)){
            Account account= loanApplication.getDisbursementAccount();
              account.setBalance(account.getBalance()+loanApplication.getRequestedAmount());
              accountService.saveLoanAccount(account);

                Loan loan=new Loan();
                loan.setLoanAmount(loanApplication.getRequestedAmount());
                loan.setEmiAmount(loanService.calculateMonthlyEmi(loanApplication.getId()).monthlyEmi().doubleValue());
                loan.setLoanType(loanApplication.getLoneType());
                loan.setAccount(loanApplication.getDisbursementAccount());
                loan.setInterestRate(12);
                loan.setStatus(LoanStatus.APPROVED);
                loan.setTenureYears(loanApplication.getTenureYears());
            loanRepository.save(loan);
        }
//        switch (loanStatus.toString()){
//            case "REJECTED":
//                loanApplication.setLoanStatus(LoanStatus.REJECTED);
//                loanApplication.setEmployee(employee);
//                break;
//
//            case "ONGOING":
//                loanApplication.setLoanStatus(LoanStatus.ONGOING);
//                break;
//
//            case "DISBURSED":
//                loanApplication.setLoanStatus(LoanStatus.DISBURSED);
//              Account account= loanApplication.getDisbursementAccount();
//              account.setBalance(account.getBalance()+loanApplication.getRequestedAmount());
//              accountService.saveLoanAccount(account);
//              loanApplicationRepository.save(loanApplication);
//                Loan loan=new Loan();
//                loan.setLoanType(loanApplication.getLoneType());
//                loan.setAccount(loanApplication.getDisbursementAccount());
//                loan.setStatus(LoanStatus.DISBURSED);
//                loan.setTenureYears(loanApplication.getTenureYears());
//            loanRepository.save(loan);
//              break;
//        }


    }

    public EmployeeActionStat applicationActionStat(String username) {
     Employee em=   employeeService.getEmpByUserName(username);
     int approvedCount=loanApplicationRepository.approvedCount(LoanStatus.ONGOING,em.getId());
     int rejectedCount =loanApplicationRepository.rejectedCount(LoanStatus.REJECTED,em.getId());
     return new EmployeeActionStat(List.of("Loan Processed","Loan Rejected"),List.of(approvedCount,rejectedCount));
    }

    public int getRequests() {
        return loanApplicationRepository.getRequests();
    }
}
