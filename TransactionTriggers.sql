use mavericbank;

DELIMITER $$

CREATE TRIGGER before_transaction_insert
BEFORE INSERT ON transaction
FOR EACH ROW
BEGIN
    DECLARE current_balance DOUBLE;

    IF NEW.transaction_type IN ('WITHDRAW', 'TRANSFER') THEN
        SELECT balance INTO current_balance 
        FROM account 
        WHERE accno = NEW.source_account_accno;

        IF current_balance IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Transaction failed: Source account does not exist.';
        END IF;

        IF current_balance < NEW.amount THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Transaction failed: Insufficient balance.';
        END IF;
    END IF;
END $$

DELIMITER ;
DELIMITER $$

CREATE TRIGGER before_transaction_insert
BEFORE INSERT ON transaction
FOR EACH ROW
BEGIN
    DECLARE current_balance DOUBLE;

    IF NEW.transaction_status != 'FAILURE' AND NEW.transaction_type IN ('WITHDRAW', 'TRANSFER') THEN
        SELECT balance INTO current_balance 
        FROM account 
        WHERE accno = NEW.source_account_accno;

        IF current_balance IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Transaction failed: Source account does not exist.';
        END IF;

        IF current_balance < NEW.amount THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Transaction failed: Insufficient balance.';
        END IF;
    END IF;
END $$

DELIMITER ;
DELIMITER $$

CREATE TRIGGER after_transaction_insert
AFTER INSERT ON transaction
FOR EACH ROW
BEGIN
    IF NEW.transaction_type = 'DEPOSIT' THEN
        UPDATE account 
        SET balance = balance + NEW.amount 
        WHERE accno = NEW.target_account_accno;

    ELSEIF NEW.transaction_type = 'WITHDRAW' THEN
        UPDATE account 
        SET balance = balance - NEW.amount 
        WHERE accno = NEW.source_account_accno;

    ELSEIF NEW.transaction_type = 'TRANSFER' THEN
        UPDATE account 
        SET balance = balance - NEW.amount 
        WHERE accno = NEW.source_account_accno;

        UPDATE account 
        SET balance = balance + NEW.amount 
        WHERE accno = NEW.target_account_accno;
    END IF;
END $$

DELIMITER ;
DELIMITER $$

CREATE TRIGGER after_transaction_insert
AFTER INSERT ON transaction
FOR EACH ROW
BEGIN

    IF NEW.transaction_status != 'FAILURE' THEN
    
        IF NEW.transaction_type = 'DEPOSIT' THEN
            UPDATE account 
            SET balance = balance + NEW.amount 
            WHERE accno = NEW.target_account_accno;

        ELSEIF NEW.transaction_type = 'WITHDRAW' THEN
            UPDATE account 
            SET balance = balance - NEW.amount 
            WHERE accno = NEW.source_account_accno;

        ELSEIF NEW.transaction_type = 'TRANSFER' THEN
            UPDATE account 
            SET balance = balance - NEW.amount 
            WHERE accno = NEW.source_account_accno;

            UPDATE account 
            SET balance = balance + NEW.amount 
            WHERE accno = NEW.target_account_accno;
        END IF;
        
    END IF;
END $$

DELIMITER ;


INSERT INTO transaction (amount, transaction_status, transaction_type, target_account_accno) 
VALUES (250.00, 'SUCCESS', 'DEPOSIT', 42);

INSERT INTO transaction (amount, transaction_status, transaction_type, source_account_accno) 
VALUES (51.0, 'SUCCESS', 'WITHDRAW', 42);

INSERT INTO transaction (amount, transaction_status, transaction_type, source_account_accno, target_account_accno) 
VALUES (100.00, 'SUCCESS', 'TRANSFER', 42, 41);
 drop trigger before_transaction_insert;
drop trigger after_transaction_insert;