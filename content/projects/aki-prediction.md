---
slug: aki-prediction
category: Machine Learning
title: Early AKI Prediction in ICU
subtitle: Clinical ML
description: Machine learning models to predict acute kidney injury using ICU time-series data (MIMIC-IV), evaluating linear models and tree-based methods with calibration analysis.
image: /images/project-aki.jpg
tags:
  - MIMIC-IV
  - Clinical ML
  - Python
  - XGBoost
repoUrl: https://github.com/wibhi-miasa
order: 6
---

## Overview

Leveraging ICU time-series data to build early warning systems for acute kidney injury, a critical clinical outcome. The project uses MIMIC-IV, one of the largest publicly available ICU databases, to train and evaluate predictive models.

![ICU monitoring dashboard](/images/aki-overview.jpg)

## Model Comparison

Comparing logistic regression, random forests, and XGBoost with careful calibration analysis using ROC and PR curves. Each model is evaluated for both discrimination and calibration to ensure clinical reliability.

![Model performance comparison](/images/aki-models.jpg)
