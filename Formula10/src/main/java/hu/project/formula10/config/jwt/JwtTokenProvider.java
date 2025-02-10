package hu.project.formula10.config.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    private final String jwtSecret = "e54127792f88dade0a6ace93850f5d8f1b0d0db2741665c35a6a9e6dae7c285965295239761ed3603afd1cf78bb5dd647c3001a4c2e35aee47a9e63563d2d3ef7fd526f2c6bff69ae39f7f7c445ff0b5f3f3bc33824026a21b1df0ffb65e2f0732a9d6982fd97a0066cdb147e9ce03efbdf1b1208a4a6a1ec8d612287d7dbcbd85103ac6fbef9462e4fa0daafde412aa03bd5281f9772cd5e186c0e43e322deac121446032022c088c3b29ecf55228addadef49ce79161d64c637e742f82699f5e0bb8536b5eb3d478140a2f8a5f989078e30dfc52ed063a01ea850e7daa313ebf14b81e2d798e1b7d470ca370e9149919ddb220baba1902ea2daeb372866c56";  // TODO Ezt cseréld ki valami biztonságos kulcsra

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
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

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

    public JwtTokenProvider() {}
}
