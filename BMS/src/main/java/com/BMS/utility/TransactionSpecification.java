package com.BMS.utility;

import com.BMS.DTO.TransactionFilterDto;
import com.BMS.enums.TransactionStatus;
import com.BMS.enums.TransactionType;
import com.BMS.model.Account;
import com.BMS.model.Transaction;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;


import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class TransactionSpecification {

    public static Specification<Transaction> filter(
            Integer customerId,
            TransactionStatus status,
            TransactionType type,
            String sourceAccount,
            String targetAccount,
            Double minAmount,
            Double maxAmount,
            Instant startDate,
            Instant endDate
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            query.distinct(true);

            Join<Transaction, Account> targetJoin =
                    root.join("targetAccount", JoinType.LEFT);

            Predicate customerPredicate =
                    cb.equal(
                            root.get("customer").get("id"),
                            customerId
                    );

            Predicate targetCustomerPredicate =
                    cb.equal(
                            targetJoin.get("customer").get("id"),
                            customerId
                    );

            predicates.add(
                    cb.or(
                            customerPredicate,
                            targetCustomerPredicate
                    )
            );

            // status filter
            if(status != null){
                predicates.add(
                        cb.equal(
                                root.get("transactionStatus"),
                                status
                        )
                );
            }

            // type filter
            if(type != null){
                predicates.add(
                        cb.equal(
                                root.get("transactionType"),
                                type
                        )
                );
            }

            // source account filter
            if(sourceAccount != null && !sourceAccount.isBlank()){
                predicates.add(
                        cb.like(
                                root.get("sourceAccount")
                                        .get("accountNumber"),
                                "%" + sourceAccount + "%"
                        )
                );
            }

            // target account filter
            if(targetAccount != null && !targetAccount.isBlank()){
                predicates.add(
                        cb.like(
                                root.get("targetAccount")
                                        .get("accountNumber"),
                                "%" + targetAccount + "%"
                        )
                );
            }

            // amount filters
            if(minAmount != null){
                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("amount"),
                                minAmount
                        )
                );
            }

            if(maxAmount != null){
                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("amount"),
                                maxAmount
                        )
                );
            }

            // date filters

            // Start Date
            if(startDate != null){
                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get("createdAt"),
                                startDate
                        )
                );
            }

            if(endDate != null){
                predicates.add(
                        cb.lessThanOrEqualTo(
                                root.get("createdAt"),
                                endDate
                        )
                );
            }


            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
