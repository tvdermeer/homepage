---
title: "Embracing Generative AI: A Data Scientist's Perspective"
slug: "lessons-from-data-science"
description: "How introducing generative AI models differs from traditional software, why evaluation is crucial, and concrete steps to control your Gen AI applications."
date: "2025-07-03"
tags: ["ai", "genai", "data-science", "evaluation", "llm"]
published: true
---

As a Gen AI engineer, I see the lines between traditional software and data science blurring fast. With more and more "Applied Gen AI" and agents embedded in applications, there should be a strong focus on quality control. Especially with engineers coming from traditional software engineering managing generative AI model implementations. Let's dive in how introducing generative AI models differs from traditional software, why evaluation is so important and what concrete steps you can take to get in control of your generative AI models.

![alt text](/images/blog/lessons-from-data-science/image-9.png)
## Traditional Software vs AI Models

Traditional software is deterministic. Input X results in output Y. You can write test cases for this. You assume the inputs and outputs in integration tests. When output Z happens, you fix your code so Input X results in output Y again.

In contrast, AI models are inherently probabilistic. Instead of fixed rules, they rely on learned parameters to generate the most likely outcome. This holds true aswell for generative AI and especially Large Language Models (LLM's). In the pre-training step, the goal of the model is to predict the next word in the sentence. For every prediction a model does, the neural network outputs a probability of the next word.

![alt text](/images/blog/lessons-from-data-science/image-10.png)
The LLM predicts "playground" as the most likely next word
When using an AI model, your premise of input X -> input Y goes out the window. This can result in countless outcomes, especially when introducing multiple steps.

## Tracking and Observability: The First Step to Control

Going from deterministic to probabilistic looks like a daunting task. How do you check for all these cases if you're not even sure what the output is going to be? Luckily, the field of data science has been trying to tame this probabilistic output for a long time and some very rigid methods are in place to make your (generative) AI application production-ready. The key here is to get an evaluation pipeline set up that will give you insights into the behaviours of your generative AI model and the interaction with your application. Let's introduce what you track and what methods help you get in control of your generative AI model.

Before you can evaluate, you first have to track what goes in and comes out of your AI model. With the formula of Input + Context = Output, you can easily break down the results and see the influences of your context (system prompt, given context through RAG, tool calls, etc.) to your inputs. Tools that can help you with tracking are MLflow, Langsmith, Arize or other well-known observability tools.

![alt text](/images/blog/lessons-from-data-science/image-11.png)
The influence of the input and context on the output
## Evaluating Gen AI: Human and Automated Approaches

Once you've tracked inputs and outputs, you can begin evaluating your model's behavior. This can be done two ways: A human evaluates the outputs and checks if the there are any odd cases or patterns that you can account for. This is always a good starting point for yourself as engineer to do evaluation and get a feel for how the model is behaving in your application. It creates intuition for what the possibilities are to get a better result. Secondly, you can create a (automated) pipeline to evaluate for you. LLM-as-a-judge is a method that uses a generative AI model to do evaluation for you. You instruct the judge model to look at the inputs, context and outputs and score the results on metrics like toxicity, faithfulness or other metrics. This scales well because you move from human evaluation to automated evaluation. However, LLM-as-a-judge is also known to have its downsides with bias for certain models generating output and possible inconsistencies in scoring.

Ideally, both human and automated evaluation work together to get a sense of how the probabilistic nature of your AI application is performing. This creates the scale of automation together with the intuition to grasp the possible agitator for the result. Let's see how this can be applied in a production setting.

## How to Stay in Control After Launch

Your initial evaluation has gone perfectly and you have tested with a test group for all kinds of cases to make sure your application is robust enough to go to production. But how do you know if your application will perform well enough in the 'wild'? Especially for public-facing generative AI application, a lot can go wrong. Get a hold of your models in two ways described below.

Keep monitoring and evaluating. As simple as that. you don't have to do this in real-time, but make sure that you have a representative sample of your application usage and run it through your evaluation pipeline. Have monitoring in place that can alert you when automated evaluation pipelines scores are under a certain threshold. Look at the (anonymised!) usage traces from your application and see if you can find cases that are not performing as you expected. Evaluation is not a one time task that you perform before going to production. it's a continuous cycle that ensures that your application is reliable and aligned with expectations. Secondly, it shows you are in control of your application and especially with generative AI, this is a must.

The second advice isn't something exclusive to the field of data science. Ask your users for feedback. Again, this can be automated through a thumbs up/thumbs down system, a feedback form or just an email address users can send their feedback to. In my experience this is way more valuable than just looking at the metrics or the traces. Their input are only words, where their feedback/looking over the shoulder session can paint the full picture.

Implementing generative AI in applications changes your traditional development cycle. The shift from deterministic to probabilistic systems demands a new mindset, new tooling, and a commitment to continuous evaluation. By combining robust tracking, thoughtful evaluation (both human and automated), and real-world monitoring, you can stay in control of your Gen AI applications, even when the outputs aren't always predictable.

This isn't a overnight shift, but a skill that can be learned, refined and scaled. Start now and your team will build more resilient, intelligent and impactful Generative AI applications.
