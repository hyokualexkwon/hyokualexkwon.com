---
title: I hosted Postiz on AWS Lightsail - Caddy was helpful
pubDate: 2025-09-07 21:00
# modDate: 2025-09-07 21:00
categories: ["Self-hosting", "AWS", "Lightsail", "Docker Compose", "Postiz", "Troubleshooting"]
description: "My experience self-hosting Postiz social media scheduler on AWS Lightsail. From memory issues and HTTPS login problems to discovering how Caddy made SSL certificate management painless - plus thoughts on the $12/month cost."
slug: i-hosted-postiz-on-aws-lightsail-caddy-was-helpful
draft: false
pin: false
---

**TL;DR**: Self-hosted Postiz on AWS Lightsail using Docker. Hit memory issues (needed 2GB RAM), couldn't log in over HTTP due to cookie security, but Caddy solved the HTTPS problem with automatic SSL certificates. Total cost: $12+/month, now looking for cheaper alternatives.

So I decided to write about my experience hosting [Postiz](https://postiz.com/) on AWS Lightsail. If you're not familiar with Postiz, it's a social media scheduling tool that lets you schedule posts across different platforms. Pretty handy if you want to post stuff all at once and want to publish it over multiple days across multiple accounts.

There are multiple software options like this, but I chose Postiz because it offers just enough features for me and it's open source, so I could host it on my own machine. I've been looking for a good social media scheduler, and while there are plenty of SaaS options out there, self-hosting gives you more control and potentially saves money in the long run.


## Choosing the Right AWS Service

I checked out [Postiz's self-hosting guide](https://docs.postiz.com/installation/docker-compose), and they recommend using Docker Compose. I looked into a few options - ECS, EC2, Lightsail. Lightsail caught my eye because of decent pricing and no headache with networking stuff. Plus the Reddit folks seemed to like it. For someone who just wants to get something running without diving deep into AWS's more complex services, Lightsail felt like the sweet spot.

## Setting Up the Instance

Setting up Lightsail was straightforward, but picking the OS made me pause. The default was AWS Linux 2023, but Postiz docs said they tested on Ubuntu. I went with Ubuntu for a few reasons: AWS Linux uses YUM (`yum install docker`) while Postiz's guided installation uses APT commands (`apt-get install docker.io`). Also, Ubuntu is easier for troubleshooting due to more resources available on the web.

## The Memory Drama

Got Ubuntu running, installed Docker Compose, and fired up Postiz's docker-compose file. But then... crashes. Memory issues. The docs said 2GB RAM minimum, but that wasn't the price point I was hoping for. I initially went with a smaller instance thinking I could optimize later, but Postiz really does need that memory to run properly.

No choice but to bump up to 2GB by spinning up a new instance from my snapshot.

## Success... Almost

Success! It was running. I could access the Postiz dashboard, but then I hit another snag: I couldn't set up anything without logging in on the /auth page. I guess the login didn't work due to it not being on HTTPS. Modern browsers require the `Secure` attribute for authentication cookies, and this attribute only works over HTTPS connections - HTTP authentication cookies get blocked for security reasons.

## The HTTPS Challenge

Let's Encrypt was my first thought, but ugh, those 90-day renewals are such a pain. I know you can set up automated renewal applications or cron jobs, but it's just another thing to maintain and potentially break.

That's when I found Caddy. This neat open-source tool that makes HTTPS setup almost too easy. Caddy automatically handles SSL certificates through Let's Encrypt, including renewals. It's like having the convenience of Let's Encrypt without the manual overhead.

## Caddy to the Rescue

Followed their setup guide and boom, it worked. Just had to tweak some ports in the docker-compose file so Caddy could reverse proxy to Postiz. The configuration was surprisingly simple - Caddy handles all the certificate stuff automatically once you point your domain to the server.

## Final Result

And there we have it! Got the X (Twitter) integration working and post scheduling was smooth as butter. The whole setup - Lightsail instance, Docker containers, reverse proxy, SSL certificates - all working together seamlessly.

It's been ages since I've actually hosted something with containers, so this took longer than expected. But honestly? These kinds of projects are always a blast. There's something satisfying about getting all the pieces to work together.

## The Cost Question

Now for the next challenge - $12 a month feels steep for this. That's the cost of the 2GB Lightsail instance, which isn't terrible for what you get, but I'm always looking to optimize. Time to hunt for cheaper alternatives!

Some options I'm considering:
- Smaller VPS providers (DigitalOcean, Linode, Vultr)
- Cloud providers with better pricing for small instances
- Maybe optimizing Postiz itself to use less memory

But for now, it's working great. If you're looking to self-host Postiz, AWS Lightsail is a good option when you're familiar with it. Caddy works really well for getting HTTPS up and running quickly. The automatic SSL handling alone makes Caddy worth it.

And that's how I got Postiz running! Not bad for a weekend project, even if it did take longer than expected. I might write a tutorial guide for this setup if there's interest.
