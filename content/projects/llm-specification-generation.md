---
slug: llm-specification-generation
category: Research
title: LLM-based Program Specification Generation
subtitle: Formal Methods × AI
description: Research pipeline that transforms real-world Python programs and uses LLMs to generate verifiable Dafny specifications. Includes dataset curation, transformation, and automated verification analysis.
image: /images/project-llm.jpg
tags:
  - LLM
  - Formal Methods
  - Dafny
  - Python
repoUrl: https://github.com/wibhi-miasa
order: 1
---

## Overview

Bridging the gap between natural language specifications and formally verified code through large language models. This research explores how LLMs can assist in generating formal program specifications from existing codebases.

![LLM pipeline architecture](/images/llm-overview.jpg)

## Dataset Curation

Automated dataset curation from real Python codebases, with transformation into Dafny-compatible specifications. The pipeline identifies suitable functions, extracts their behavior, and prepares them for formal verification.

![Dataset curation process](/images/llm-dataset.jpg)

## Verification Analysis

Comprehensive verification analysis evaluating the correctness and completeness of generated specifications. Results are benchmarked against hand-written specifications to measure quality and coverage.

![Verification results](/images/llm-verification.jpg)
