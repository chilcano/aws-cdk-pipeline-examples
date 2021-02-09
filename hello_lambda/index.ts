// index.ts
 const GREETING = "Hello Lambda TypeScript ;) \n";
export async function main(event: any, context: any) {
  console.log(GREETING);
  return GREETING;
}
