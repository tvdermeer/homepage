FROM mcr.microsoft.com/devcontainers/typescript-node:4-24-trixie

USER node

RUN npm install -g opencode-ai \
    && npm install -g typescript-language-server vscode-langservers-extracted \
    && npm install -g @code-yeongyu/comment-checker \
    && npm install -g @devtheops/opencode-plugin-otel \
    && npm install -g @arizeai/phoenix-cli \
    && ln -sf /usr/local/share/npm-global/lib/node_modules/@code-yeongyu/comment-checker/bin/comment-checker /usr/local/share/npm-global/bin/comment-checker

RUN npx -y oh-my-opencode install --no-tui --claude=no --openai=no --gemini=no --copilot=no --opencode-zen=no --zai-coding-plan=no --opencode-go=yes --kimi-for-coding=no --vercel-ai-gateway=no

COPY config/opencode/opencode.json /home/node/.config/opencode/opencode.json
COPY config/opencode/oh-my-openagent.json /home/node/.config/opencode/oh-my-openagent.json

RUN ZSH_CUSTOM="${ZSH_CUSTOM:-/home/node/.oh-my-zsh/custom}" \
    && git clone --depth 1 https://github.com/marlonrichert/zsh-autocomplete.git "$ZSH_CUSTOM/plugins/zsh-autocomplete" \
    && git clone --depth 1 https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"

RUN sed -i 's/^plugins=(git)$/plugins=(git zsh-autocomplete zsh-syntax-highlighting)/' /home/node/.zshrc \
    && if ! grep -q 'opencode' /home/node/.zshrc; then printf '\n# opencode npm global path\nexport PATH="$PATH:/usr/local/share/npm-global/bin"\n' >> /home/node/.zshrc; fi