package com.BMS.utility;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
@Component
public class AccountNumberGenerator {

    private static final SecureRandom random = new SecureRandom();

    public String generateAccountNumber() {
        // Generate 8 digits, ensuring leading zeros are preserved
        int number = random.nextInt(100_000_000); // 0 to 99,999,999
        return String.format("%08d", number);
    }
}
