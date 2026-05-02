---
title: "GenAI in the Enterprise: Lessons from Regulated Industries"
slug: "lessons-from-the-enterprise"
description: "Practical advice for developing and scaling GenAI applications in highly regulated sectors like financial services and government."
date: "2025-07-09"
tags: ["ai", "genai", "enterprise", "governance", "regulated"]
published: true
---

Generative AI is gaining traction across industries, but in highly regulated sectors like financial services and government, implementation is far from straightforward. Based on my experience working with both, here's practical advice for developing and scaling GenAI applications responsibly.

![alt text](/images/blog/lessons-from-the-enterprise/image-8.png)
## Start Small, Think Big

Highly regulated organizations have a tendency to create big programs and enormous endeavours to implement Generative AI in their organization. From my experience, growing it more organically with a clear vision for the future works better.

This starts with the use case selection for your Generative AI application. My advice is to choose a use case with a small user base but high value, measured in for example efficiency gains or automation. By keeping it as a small use case, it's easy to pivot, clear and direct connection with end-users for feedback and makes the odds of success bigger. If you have an organization-wide application that needs to please everyone, is vetted by different departments and must adhere to high throughput and loads of users, it makes the live of the product team very difficult.

With having the "Start Small" clear, "Think Big" is as important. You don't want to aim for a Proof of Concept, do a demo and land on the shelf. You want this application to succeed and actually bring value. Thinking big means planning for future adoption and scalability from day one. Here are a few ways to think big while starting small:

Being in tune with Risk and Security colleagues and make sure that you work together.
Gather data and feedback to evaluate from the start and catch errors early.
What is the next step for the use case? Apply it to a different domain? Roll it out for more user?
Strong governance is essential to ensure your GenAI initiative doesn't fail under scrutiny.
## Governance is Everything

While I'm not a governance specialist, I've worked closely with governance teams to ensure GenAI applications meet compliance standards. I see governance as an umbrella term covering the processes and controls that ensure your application is up to par. Some organizations have this clearly defined with a checklist of requirements that must be met for approval. On the other hand, it can be defined as "adhere to European law and guidelines" and no clear path to success.

Ideally, you are guided through this process with clear steps and processes that you have to go through, points of contact to talk to when in doubt and finally a quick stamp of approval. If that's not the case, you should initiate the governance process yourself and think about the following:

Don't reinvent the wheel. Borrow from adjacent processes and apply it to your case or find best practices and materials online and apply
Try to include the right people from the start and work together. Who is responsible for Risk, Security, Legal, Infrastructure, etc. that can sign off on it and is willing to actively help you?
Build robust tests for your application that show you actively test for risks and show how your application mitigates those. Use the OWASP AI testing guide as a reference for this.
Pave the way for the next Gen AI use cases to have a better process in place than you had. Formalize, Institutionalize and Legitimize.
## Case Study: In Control of a RAG Chatbot Use Case

Here's a concrete example of how we applied these principles in a real-world project: A department within a government organization had been experimenting with GenAI solutions and decided to formally establish a technical team to build a first version of a GenAI-powered chatbot. The chatbot has access to internal technical application documentation and can retrieve the documentation for relevant context and further reading by the user.

Previously, finding the right information could take anywhere from several minutes to over an hour. Using the chatbot to ask questions and receive source-backed answers significantly increased efficiency. It also reduced the burden on first-line support staff, allowing them to focus on more meaningful work. Lastly, there is a steep learning curve in the department where a big part of the problem is going through and understanding the documentation. This chatbot helps people to understand the documentation more easily by asking questions and getting elaborate answers with direct links to the documentation used.

From a governance perspective, most of the controls were already in place, but scattered in big control frameworks. Some controls were applicable, some not. Our strategy was to involve the control teams (Risk, Security, Privacy, etc.) early and get a reading of what was needed and what not. This turned out to be more pragmatic than we expected. Some controls were already covered by standardized cloud infrastructure components. Additionally, our use case was not the first and we chose not to reinvent the wheel and collaborated closely with another team working on a similar use case. They could provide guidance on how to tackle certain controls, how to gather evidence and pinpoint what was needed to show that we were building the use case responsibly.

The remaining gaps we identified, due to the unique aspects of our use case, were addressed by involving the control departments in our solutioning. By having open and honest conversations on our technical approach, the checks we built in and how we went about our way on their topics of security and data privacy, we could embed trust. Examples are implementing role-based access controls for both using the application and the underlying data and privacy-friendly logging of application behaviour.

As a result, we passed all controls smoothly and created a blueprint for future GenAI use cases to follow. This Gen AI powered chatbot use case is now being rolled out to different teams in the department, finally empowering more than 300 people.

## Risk and Security as Partners, Not Adversaries

In the past, I have fallen in the trap that I saw Risk and Security controls as unnecessary hoops that my team had to go through. Going through the paperwork, provide evidence and make sure that everything was correct. It's a burden, but I now see the value in both an organisational and technical sense.

From a regulated organisational perspective, showing you're in control is imperative. The rules in place are probably not designed by risk and security themselves, but is a translation from dense and unclear guidelines, european laws or other sources. Therefore, I strongly recommend to get into contact and have a human conversation over these bureaucratic controls from these documents. Most of the time, the people working there are much more pragmatic, have a good sense of what is possible and what is not. They can facilitate you to get into contact with teams already doing the translation to a concrete use case.

When looking at Risk and Security related to (Generative) AI, this can be a less rigid process. Since the rapid innovations around this technology and the big push for efficiency, getting controls in place is a fluid situation. What helped me was bringing the people from Risk, Security and Legal together and having a round table. Explain your technical goals clearly and outline any uncertainties or potential roadblocks. Ask what you think are road blocks or you think is unclear. Most of the time, they have a far better understanding than you expect and can give you guidance that is concrete and applicable to your situation.

From a technical sense, there are some great tools and frameworks already available to show you are in control of your solution. Firstly, the Gen AI OWASP top ten is a great checklist to see what security risk for Gen AI are out there and what you can try to comply with, fitting the use case of course. Secondly, being able to continuously monitor your application is important to detect misuse or unexpected behaviour. Lastly, having a mix of automated and human evaluation in place gives yourself and others the assurance that your application is working correctly.

## Scaling with Confidence

If you feel you are doing well on previous points, you can start scaling with confidence! You know that the solution is governed and the valuable decision makers in your organisation are aware. They won't stop you from scaling as long as you show the added value and as long as you continue to operate within the established governance framework. Secondly, because they are aware and have guided you during the first use case, they are probably more helpful and more conscientious of making the scale-up a success.

Risk and security are your partners now, so you know whom to speak to about your scale-up plan. You can involve them from the initiation of the use case and create a sense of ownership of executing this risk aware and securely.

Lastly, your team has gone through the governance process before. You have done the tedious work once, and this time it will only be easier. The scale-up of your use case will be partially the same and you can reuse much of the groundwork you've already laid. You know what to focus on and you have your friends in the right places to guide you. No one will be stopping you and your team of bringing the next steps of your use case to successful implementation.

To conclude, implementing GenAI in regulated environments isn't easy but it's absolutely possible with the right approach. Start small, think big, involve the right people early, and build with governance in mind. The case study shows how all these steps hold true and form a good foundation for further development.
