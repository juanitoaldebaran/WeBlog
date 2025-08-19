package com.aldebaran.WeBlog.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Value("${jwt.secret-key}")
    private String JWT_SECRET_KEY;

    @Value("${jwt.expiration}")
    private long expiresIn;

    public <T> T extractClaims(String jwtToken, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String jwtToken) {
        try {
            return Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(jwtToken)
                    .getBody();
        } catch (Exception e) {
            logger.error("Error parsing JWT token: " + e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public String extractUsername(String jwtToken) {
        try {
            String username = extractClaims(jwtToken, Claims::getSubject);
            logger.debug("Extracted username from token: " + username);
            return username;
        } catch (Exception e) {
            logger.error("Error extracting username from JWT: " + e.getMessage());
            return null;
        }
    }

    public Date extractExpiration(String jwtToken) {
        return extractClaims(jwtToken, Claims::getExpiration);
    }

    public boolean isTokenValid(UserDetails userDetails, String jwtToken) {
        try {
            final String username = extractUsername(jwtToken);
            return (username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken));
        } catch (Exception e) {
            logger.error("Error validating JWT token: " + e.getMessage());
            return false;
        }
    }

    public boolean isTokenExpired(String jwtToken) {
        try {
            return extractExpiration(jwtToken).before(new Date());
        } catch (Exception e) {
            logger.error("Error checking token expiration: " + e.getMessage());
            return true;
        }
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public String generateToken(UserDetails userDetails) {
        return generateJwtToken(new HashMap<>(), userDetails);
    }

    public String generateJwtToken(Map<String, Object> claims, UserDetails userDetails) {
        return buildJwtToken(claims, userDetails);
    }

    public String buildJwtToken(Map<String, Object> claims, UserDetails userDetails) {
        try {
            String token = Jwts.builder()
                    .setClaims(claims)
                    .setSubject(userDetails.getUsername())
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + expiresIn))
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                    .compact();

            logger.debug("Generated JWT token for user: " + userDetails.getUsername());
            return token;
        } catch (Exception e) {
            logger.error("Error generating JWT token: " + e.getMessage());
            throw new RuntimeException("Could not generate JWT token", e);
        }
    }

    public Key getSigningKey() {
        try {
            byte[] byteKey = Decoders.BASE64.decode(JWT_SECRET_KEY);
            return Keys.hmacShaKeyFor(byteKey);
        } catch (Exception e) {
            logger.error("Error creating signing key: " + e.getMessage());
            throw new RuntimeException("Invalid JWT secret key", e);
        }
    }
}