# Cloudflare Free Plan Setup

This project can run permanently on the free Vercel domain before a custom domain is purchased:

```txt
https://pei-design.vercel.app
```

After `pei.design` is purchased, use Cloudflare Free as the DNS and edge configuration layer.

## Reality Check

Cloudflare account registration does not create a free custom domain. A domain such as `pei.design` must be registered through Cloudflare Registrar or another domain registrar, and registration requires payment.

Free options before buying a domain:

```txt
Vercel: https://pei-design.vercel.app
Cloudflare Pages: https://<project>.pages.dev
```

These free subdomains can be used as public portfolio links, but they do not guarantee stable Mainland China access.

For reliable Mainland China access, there are only two realistic paths:

```txt
1. Mainland China hosting/CDN + ICP filing
2. Paid enterprise-grade China acceleration service
```

Cloudflare China Network is not part of the Free plan. It is a separate Enterprise subscription and requires a valid ICP filing for the apex domain.

## 1. Add Site

1. Open Cloudflare Dashboard.
2. Add a site: `pei.design`.
3. Select the Free plan.
4. Copy the two Cloudflare nameservers.
5. Go to the domain registrar and replace the registrar nameservers with Cloudflare nameservers.

Cloudflare only becomes active after the registrar nameservers are changed.

## 2. DNS Records

Use these records for Vercel:

```txt
Type    Name    Value
A       @       216.198.79.1
CNAME   www     28b164b23897bffb.vercel-dns-017.com.
```

Recommended start:

```txt
Proxy status: DNS only
```

After Vercel verifies the domain and HTTPS is healthy, proxying can stay DNS only or be changed to Proxied if you want Cloudflare edge features. For Vercel-hosted sites, DNS only is the least surprising setup.

## 3. SSL/TLS

Recommended:

```txt
SSL/TLS encryption mode: Full
Always Use HTTPS: On
Automatic HTTPS Rewrites: On
Minimum TLS Version: TLS 1.2
```

Do not use Flexible SSL with Vercel.

## 4. Speed

Recommended free settings:

```txt
Brotli: On
HTTP/3: On
Early Hints: On
0-RTT: Off
Rocket Loader: Off
Auto Minify: Off
```

Next.js already optimizes JS/CSS. Keep Auto Minify off unless there is a measured reason to enable it.

## 5. Caching

Recommended:

```txt
Caching Level: Standard
Browser Cache TTL: Respect Existing Headers
Always Online: Off
Development Mode: Off except while debugging DNS/cache issues
```

Vercel controls immutable asset caching for `/_next/static/*`; Cloudflare should respect those headers.

## 6. Security

Recommended free settings:

```txt
WAF Managed Rules: On if available
Bot Fight Mode: Optional
Security Level: Medium
Browser Integrity Check: On
```

Avoid aggressive bot settings for a portfolio site because HR and startup visitors may browse from corporate networks.
