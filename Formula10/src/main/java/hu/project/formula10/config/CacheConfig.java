package hu.project.formula10.config;

import java.net.URISyntaxException;

import javax.cache.Caching;
import javax.cache.spi.CachingProvider;

import org.ehcache.jsr107.EhcacheCachingProvider;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.jcache.JCacheCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() throws URISyntaxException {
        // Ehcache konfiguráció betöltése az ehcache.xml fájlból
        CachingProvider provider = Caching.getCachingProvider(EhcacheCachingProvider.class.getName());
        javax.cache.CacheManager ehCacheManager = provider.getCacheManager(
                getClass().getClassLoader().getResource("ehcache.xml").toURI(),
                getClass().getClassLoader());

        return new JCacheCacheManager(ehCacheManager);
    }
}
