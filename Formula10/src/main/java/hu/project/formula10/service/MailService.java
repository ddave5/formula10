package hu.project.formula10.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.resource.Emailv31;

import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
public class MailService {

    @Value("${mailjet.api.key}")
    private String apiKey;

    @Value("${mailjet.api.secret}")
    private String apiSecret;

    public MailService() {}

    public void sendResetPasswordEmail(String recipientEmail, String resetLink) {
        MailjetClient client = new MailjetClient(ClientOptions.builder().apiKey(apiKey).apiSecretKey(apiSecret).build());
        MailjetRequest request = new MailjetRequest(Emailv31.resource)
            .property(Emailv31.MESSAGES, new JSONArray()
                .put(new JSONObject()
                    .put(Emailv31.Message.FROM, new JSONObject()
                        .put("Email", "formula10noreply@proton.me")
                        .put("Name", "No Reply"))
                    .put(Emailv31.Message.TO, new JSONArray()
                        .put(new JSONObject().put("Email", recipientEmail)))
                    .put(Emailv31.Message.SUBJECT, "Jelszó visszaállítás")
                    .put(Emailv31.Message.HTMLPART,
                        "<p>Kattints az alábbi linkre a jelszavad visszaállításához:</p>"
                        + "<p><a href=\"" + resetLink + "\">Jelszó visszaállítása</a></p>")
                )
            );

        try {
            MailjetResponse response = client.post(request);
            log.info("MailJet response: {}", response.getStatus());
        } catch (MailjetException e) {
            log.error("MailJet hiba: ", e);
        }
    }
}