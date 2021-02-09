// index.ts
 const GREETING = "Hello Lambda TypeScript !!!\n\n";
export async function main(event: any, context: any) {
  console.log(GREETING);
  return GREETING;
}
