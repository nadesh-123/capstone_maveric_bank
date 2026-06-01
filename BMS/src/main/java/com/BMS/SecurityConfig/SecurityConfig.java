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
        http .cors(cors -> cors.configure(http))
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable) /// Spring needs this for POST,PUT & DELETE
                //.csrf(ref->ref.disable())localhost:8080/api/account/add/customer
                .sessionManagement(session -> session
                        .sessionCreationPolicy(org.springframework.security.config.http.SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorize -> authorize
                               .requestMatchers(HttpMethod.GET, "/api/loan/calculate-emi/{applicationId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/user/loginv2").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/loan-application/apply").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/user/emp/loginv2").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/account/get/account/unapproved").authenticated()
                                .requestMatchers(HttpMethod.GET, "/api/account/getAccounts/{customerId}").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/getCustomer/user-id/{userId}").hasAuthority("EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/account/approve/{accNo}/{empId}").hasAuthority("EMPLOYEE")
                                .requestMatchers(HttpMethod.POST, "/api/account/add/customer").authenticated()

                                .requestMatchers(HttpMethod.POST, "/api/createUser").permitAll()
                                .requestMatchers(HttpMethod.POST, "/api/customer/addCustomer").permitAll()
                                .requestMatchers(HttpMethod.POST, "/admin/add-employee").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/admin/add-admin").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/account/getAccounts/{customerId}").authenticated()

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

        // Match this exactly to your Vite React development server URL
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
