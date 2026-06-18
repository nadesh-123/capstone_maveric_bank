package com.BMS.SecurityConfig;

import com.BMS.service.DetailsService;
import com.BMS.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
class SecurityConfig{
DetailsService detailsService;
JwtFilter jwtFilter;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configure(http))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable) /// Spring needs this for POST,PUT & DELETE
                //.csrf(ref->ref.disable())localhost:8080/api/account/add/customer

                .authorizeHttpRequests(authorize -> authorize
                        //Transaction API
                        .requestMatchers(HttpMethod.POST, "/api/transaction-Withdraw-Deposit-Transfer").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/transaction/get-transactions").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/transaction/filter").authenticated()
                         //customer
                        .requestMatchers(HttpMethod.GET, "/api/user/loginv2").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/customer/addCustomer").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/loan/max-amount").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/account/allowed/accounts").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/account/adminStat").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/account/deactivate/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/account/deactivation-request").hasAnyAuthority("MANAGER","EMPLOYEE")
                        .requestMatchers(HttpMethod.POST, "/api/account/add/Account").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/account/getAccounts").authenticated()
                        ////LOAN APPLICATION
                        .requestMatchers(HttpMethod.POST, "/api/loan-application/apply").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.POST, "/api/documents/upload/{appId}").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET,"/api/loan/getAll").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/application/stat").hasAuthority("EMPLOYEE")
                        //EMPLOYEE/adminStat
                        .requestMatchers(HttpMethod.GET, "/api/user/emp/loginv2").authenticated()

                        .requestMatchers(HttpMethod.GET, "/api/emp/account-stat").hasAuthority("EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/emp/getCustomer/{customerId}").hasAuthority("EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/emp/approve/{accountNumber}").hasAuthority("EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/loan/calculate-emi/{applicationId}").hasAnyAuthority("EMPLOYEE","MANAGER")
                        .requestMatchers(HttpMethod.GET, "/api/account/unapproved").hasAuthority("EMPLOYEE")//paginated
                        .requestMatchers(HttpMethod.GET, "/api/loanApplication-pending").hasAnyAuthority("EMPLOYEE","MANAGER")//paginated

                        .requestMatchers(HttpMethod.PUT, "/api/loan-application/action/{applicationId}").hasAnyAuthority("EMPLOYEE","MANAGER")
                        .requestMatchers(HttpMethod.GET, "/api/emp/get-pending-actinons").hasAnyAuthority("EMPLOYEE","ADMIN")


                        .requestMatchers(HttpMethod.POST, "/api/beneficiary/add").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/beneficiary/get").hasAuthority("CUSTOMER")

                        .requestMatchers(HttpMethod.POST, "/api/admin/add-employee").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/admin/get-alL-emp").hasAuthority("ADMIN")//Paginated
                        .requestMatchers(HttpMethod.POST, "/api/admin/add-admin").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/transaction/get-transactions").hasAuthority("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/api/branch/getAll").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/branch/stat").hasAnyAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, " /api/admin/get-reports").hasAnyAuthority("ADMIN")
                        .anyRequest().authenticated()
                );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.httpBasic(Customizer.withDefaults()); //i am telling Spring that i am using Basic Auth technique
        return http.build();
    }
@Bean
public DaoAuthenticationProvider authenticationProvider(){
    DaoAuthenticationProvider dao = new DaoAuthenticationProvider(detailsService);
    dao.setPasswordEncoder(passwordEncoder());
    return dao;
}
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();


        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        // Allowed HTTP Methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allowed Request Headers
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Cache-Control"));

        // Allow cookies or auth headers to be sent if needed
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this configuration to all endpoints
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
