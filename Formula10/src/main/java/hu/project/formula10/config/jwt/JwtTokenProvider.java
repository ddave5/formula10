package hu.project.formula10.config.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private long jwtExpirationMs;
    // 1 óra érvényesség
    @Value("${jwt.rememberMeExpirationMs}")
    private long jwtRememberMeExpirationMs;

    // Token generálása

    /* TODO Token élettartamának frissítése (opcionális):
     * Ha szeretnéd, hogy a felhasználó aktív maradása esetén a token élettartama meghosszabbodjon,
     * akkor implementálhatsz egy "token refresh" mechanizmust,
     * amely automatikusan meghosszabbítja a token lejárati idejét, ha a felhasználó aktív.
     */
    public String generateToken(String username, boolean rememberMe) {
        long expirationTime = rememberMe ? jwtRememberMeExpirationMs : jwtExpirationMs;

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    // Tokenből felhasználónév kiolvasása
    public String getUsernameFromJWT(String token) {
        Claims claims = null;

        try {
            claims = Jwts.parserBuilder()
            .setSigningKey(jwtSecret)
            .build()
            .parseClaimsJws(token)
            .getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return claims.getSubject();
    }

    // Token érvényesség ellenőrzése
    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
