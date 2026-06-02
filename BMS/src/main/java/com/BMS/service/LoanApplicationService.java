package com.BMS.service;

import com.BMS.DTO.LoanApplicationDto;
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
    AccountService accountService;
    LoanApplicationRepository loanApplicationRepository;
    LoanApplicationToDto loanApplicationToDto;
EmployeeService employeeService;
LoanRepository loanRepository;
    private static final String UPLOAD_LOC = "D:/UploadFileApi";
    public  LoanApplication findApplicationById(int applicationId) {
       return loanApplicationRepository.findById(applicationId).orElseThrow(()->new ResourceNotFoundException("invalid application id"));
    }
//    public void addApplication(LoanApplication loanApplication) {
//        loanApplicationRepository.save(loanApplication);
//    }
//public LoanAppDto getLoanApplication(int id){
//     LoanApplication loanApplication=  loanApplicationRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("invalid application id"));
//   return   loanApplicationToDto.mapToLoanAppDto(loanApplication);
//}
//    public void deleteLoanApplication(int loanAppId) {
//       LoanApplication loanApplication= loanApplicationRepository.findById(loanAppId).orElseThrow(()->new ResourceNotFoundException("invalid application id"));
//        loanApplicationRepository.delete(loanApplication);
//    }
//
//    public List<LoanAppDto> getPendingApp() {
//       List<LoanApplication> list= loanApplicationRepository.findByLoanStatus(LoanStatus.PENDING);
//       return list.stream().map(loanApplicationToDto::mapToLoanAppDto).toList();
//    }

    public void createLoanApplication(LoanApplicationDto loanApplicationDto) {
        Account account=accountService.getAccountById(loanApplicationDto.disbursementAccountId());
        System.out.println(account);
        LoanApplication loanApplication=loanApplicationToDto.mapDtoToLoanApplication(loanApplicationDto,account);
        loanApplicationRepository.save(loanApplication);
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

    public List<LoanApplicationDto> allPendingLoanApplications(int page, int size) {
        Pageable pageable= PageRequest.of(page,size);
       List<LoanApplication> list= loanApplicationRepository.findByLoanStatus(LoanStatus.PENDING,pageable).getContent();
       return list.stream().map(k->loanApplicationToDto.mapLoanApplicationToDto(k)).toList();
    }

    public void actionOnLoanApplication(LoanStatus loanStatus, String username, int applicationId) {
        LoanApplication loanApplication=findApplicationById(applicationId);
        Employee employee=employeeService.getEmpByUserName(username);
        loanApplication.setLoanStatus(LoanStatus.REJECTED);
        switch (loanStatus.toString()){
            case "REJECTED":

                loanApplication.setEmployee(employee);
                break;

            case "APPROVED":
                loanApplication.setLoanStatus(LoanStatus.APPROVED);
                break;

            case "DISBURSED":
                loanApplication.setLoanStatus(LoanStatus.DISBURSED);
              Account account= loanApplication.getDisbursementAccount();
              account.setBalance(account.getBalance()+loanApplication.getRequestedAmount());
              accountService.saveLoanAccount(account);
              loanApplicationRepository.save(loanApplication);
                Loan loan=new Loan();
                loan.setLoanType(loanApplication.getLoneType());
                loan.setAccount(loanApplication.getDisbursementAccount());
                loan.setStatus(LoanStatus.DISBURSED);
                loan.setTenureYears(loanApplication.getTenureYears());
            loanRepository.save(loan);
              break;
        }


    }
}
