package com.MateuszSuplewski.Zoo.auth;

import com.MateuszSuplewski.Zoo.config.JwtService;
import com.MateuszSuplewski.Zoo.user.Role;
import com.MateuszSuplewski.Zoo.user.User;
import com.MateuszSuplewski.Zoo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        repository.save(user);
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Invalid email or password!"));

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

   public User findUserFromToken(String token){
       String userEmail = jwtService.extractUsername(token);
       var user = repository.findByEmail(userEmail).orElseThrow(() -> new UsernameNotFoundException("Can't find user connected with the token"));
        return user;
    }

   public Integer findUserIdFromToken(String token){
       var user = findUserFromToken(token);
       var userId = user.getId();
       return userId;
    }

//    public Integer findUserFirstNameFromToken(String token){
//        var user = findUserFromToken(token);
//        var userId = user.getId();
//        return userId;
//    }

    public Role findUserRoleFromToken(String token){
        var user = findUserFromToken(token);
        var userRole = user.getRole();
        return userRole;
    }
}
