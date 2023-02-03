package com.MateuszSuplewski.Zoo.auth;

import com.MateuszSuplewski.Zoo.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/role")
    public ResponseEntity<Role> checkRole(@RequestBody String token){
        return ResponseEntity.ok(service.findUserRoleFromToken(token));
    }

    @PostMapping("/id")
    public ResponseEntity<Integer> getUserId(@RequestBody String token){
        return ResponseEntity.ok(service.findUserIdFromToken(token));
    }

}
