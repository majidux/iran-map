// import { IranMap } from "@/components/Map/IranMap";
import dynamic from 'next/dynamic'
const IranMap = dynamic(
  () =>
    import('@/components/Map/IranMap').then((mod) => {
      return mod;
    }),
  { ssr: false }
);


export default function Home() {
  return (
    <main>
      <IranMap/>
    </main>
  )
}
