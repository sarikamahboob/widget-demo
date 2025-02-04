import MapComponents from "@/components/MapComponents";
export default function Home() {
  return (
    <div>
      <MapComponents
        widget={false}
        bkoiGL={true}  
      />
    </div>
  );
}
