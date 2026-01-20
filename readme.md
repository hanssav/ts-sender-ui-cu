1. create base react/ next js app;
2. connect our wallet, with nicer connect application

```
  pnpm add @rainbow-me/rainbowkit@2.2.4
  pnpm add wagmi viem@2.x @tanstack/react-query
```

https://rainbowkit.com/docs/installation
https://wagmi.sh/

3. create project in

```
https://dashboard.reown.com/sign-in
https://dashboard.reown.com/71eca4af-1b69-475b-8ae9-aaad56d5e2eb/df55b6f0-e7dc-49bd-92bc-7d4772d4ebb6
```

4. implement this function;

```javascript
function airdropErc20(
  address tokenAddress, // ERC20 token
  address[] calldata recipients,
  uint256[] calldata amounts,
  uint256 totalAmount,
)
```

5. deploy to fleex
