// import { useState, useEffect } from "react";
// import { feriaService } from "@/kilombo/feriaService";
// import { Feria } from "@/types/feria";

// export function useListaFerias() {
//   const [ferias, setFerias] = useState<Feria[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let mounted = true;

//     (async () => {
//       try {
//         const data = await feriaService.getAll();
//         if (mounted) setFerias(data);
//       } catch (e) {
//         if (mounted) setError((e as Error).message);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();

//     return () => { mounted = false };
//   }, []);

//   return { ferias, loading, error };
// }
