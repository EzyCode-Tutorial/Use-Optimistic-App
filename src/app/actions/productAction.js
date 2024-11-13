"use server";

export async function productAction(productName) {
  // Your server-side logic here
  // DB operation
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      //   reject();
    }, 2000);
  });
  return productName;
}
