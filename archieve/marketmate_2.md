---
slug: marketmate-qvm-navigation
category: UX Design
title: MarketMate
subtitle: Helping visitors navigate and discover Queen Victoria Market through AR-powered wayfinding and a personalised recommender system.
description: A mobile application designed to help visitors find stalls, plan personalised tours, and explore Queen Victoria Market using augmented reality navigation.
image: /images/project-marketmate.jpg
tags:
  - UX Design
  - Field Research
  - Mobile App
  - Figma
  - AR
prototypeUrl: https://your-figma-link-here
ctaLabel: View Figma Prototype
order: 1
---

## Overview

MarketMate is a mobile application concept developed through a real-world fieldwork study at Queen Victoria Market — a historic cultural landmark in Melbourne that attracts millions of visitors every year. With over 600 stalls spread across multiple sheds and outdoor sections, the market is a beloved destination that nonetheless presents real challenges for the people who visit and work there.

The project was completed as part of the Fieldwork for Design subject in my Master of Computer Science at the University of Melbourne, conducted in a team of four over two phases: an investigation phase and a design phase.

## Research Methods

We used a mixed-methods approach, combining two complementary fieldwork techniques to capture both human behaviour and the physical environment.

**Interviews** — We conducted semi-structured interviews with 8 participants, deliberately spanning three age groups (15–25, 25–35, 35–45) to account for varying comfort levels with technology. Crucially, we interviewed both customers and traders — giving us insight from both sides of the market experience.

**Observation** — We conducted covert naturalistic observation in pairs: one researcher focused on the physical environment (signage, layout, stall organisation), while the other tracked visitor behaviour and interactions.

**Analysis** — Interview data was analysed using thematic analysis, with affinity mapping used to cluster insights into four core themes: purpose of visit, navigation, payment method, and shopping experience.

![Participant breakdown](/images/marketmate-participants.jpg)

## Key Findings

Thematic analysis surfaced four areas of challenge across all participant types.

**Navigation** was the most critical issue. Half of all participants (4 out of 8) reported difficulty finding specific stalls. Signage is sparse, poorly placed, and mounted too high to notice at eye level. Compounding the problem, stall positions rotate weekly — meaning even frequent visitors like P8, who shops there three times a week, still struggle to locate unfamiliar stalls.

**Shopping experience** revealed unmet needs around product information — particularly dietary filters (halal, gluten-free, vegan) and product provenance. Visitors wanted to know where produce came from and what was in season, but had no way to find out.

**Payment** friction emerged as a secondary pain point: ATMs are poorly signed, leading visitors to default to card payments and unknowingly pay surcharges.

![Affinity diagram — navigation pain points](/images/marketmate-affinity.jpg)

We developed two personas to anchor the design: **Irene**, a tech-comfortable student visitor who wants to navigate efficiently while buying ingredients, and **Peter**, a trader who prefers cash payments and struggles with the repetitive process of packing down stalls for weekly market events.

![Personas](/images/marketmate-personas.jpg)

## Problem Statement

Through our fieldwork, a clear problem emerged: Queen Victoria Market has over 600 stalls but no reliable way for visitors to find what they are looking for. Unclear signage, rotating stall locations, and a lack of personalised information leaves visitors frustrated, disoriented, and underserved.

> I don't know where the stall is. I just wander around hoping I can find it.
> — Participant 2, regular Melbourne resident

> There are not many visual cues to find the different sections of the market.
> — Participant 3, visitor

![Signage observation at QVM](/images/marketmate-signage.jpg)

## Design Decision

Before arriving at our solution, we evaluated several alternatives: static digital maps, QR code-based navigation, and physical signage improvements. Each was rejected for the same reason — they lacked real-time responsiveness and couldn't adapt to the market's rotating stall layout.

AR navigation was chosen because it provides visual, real-time guidance overlaid onto the physical environment — directly addressing the core problem of visitors not knowing where to look or walk. Research in comparable settings such as museums and retail environments supports AR as effective for complex indoor spaces.

The personalised recommender system was added to address the secondary problem: visitors don't know what the market offers relative to their own needs and preferences.

## Solution

MarketMate is structured around two core features:

**MarketAR — AR Guidance and Indoor Navigation**
Users search for a stall, view its details including location, payment methods, and estimated walk time, then launch AR navigation. The camera screen overlays a directional arrow guide onto the real market environment, guiding the user step by step to their destination.

**MarketMatch — Personalised Recommender System**
During onboarding, users set dietary preferences, interests, and available time. The app generates personalised tour itineraries — curated routes through the market based on what the user actually cares about. Users can also build their own custom journey by selecting specific destinations.

![Solution overview](/images/marketmate-solution.jpg)

## Design Process

The design began with a user journey map to identify the key touchpoints across the MarketMate experience — from onboarding and preference setting through to AR navigation and tour completion. This helped ensure the app's flow was logical before moving into visual design.

We then created low-fidelity wireframes for all core screens, testing the information hierarchy and layout before committing to high-fidelity design.

![Wireframes](/images/marketmate-wireframes.jpg)

The high-fidelity prototype was built in Figma, using real QVM photography in the AR screens to ground the concept in the actual physical environment of the market.

![High-fidelity prototype screens](/images/marketmate-prototype.jpg)

## Reflections

This project surfaced some genuine tensions that shaped how I think about design decisions.

**Digital divide** — AR navigation inherently favours tech-comfortable users. Older visitors or those less familiar with smartphones may find the interface alienating rather than helpful. A truly inclusive solution would require a low-tech fallback.

**The Matthew Effect** — A personalised recommender system risks making popular stalls even more visible while leaving smaller vendors undiscovered. Design that claims to help everyone can quietly disadvantage some.

**Privacy** — Collecting dietary preferences, location data, and browsing behaviour raises real data security concerns that we acknowledged as areas for future design work.

These aren't problems we fully solved — but recognising them early is part of responsible design practice.
