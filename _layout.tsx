//

// import React from "react";
// import { Stack } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// if (!publishableKey) {
//   throw new Error(
//     "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
//   );
// }

// const RootLayout = () => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Stack>
//         <ClerkProvider publishableKey={publishableKey}>
//           <ClerkLoaded>
//             <Stack />
//           </ClerkLoaded>
//         </ClerkProvider>
//       </Stack>
//     </SafeAreaView>
//   );
// };

// export default RootLayout;
