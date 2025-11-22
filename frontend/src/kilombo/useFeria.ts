// import { useState, useEffect } from "react";
// import { feriaService } from "@/services/feriaService";
// import { Feria } from "@/types/feria";

// export function useFeria(id: number) {
//   const [feria, setFeria] = useState<Feria | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const f = await feriaService.getById(id);
//         if (mounted) setFeria(f);
//       } catch (e) {
//         if (mounted) setError((e as Error).message || "Error al obtener feria");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   return { feria, loading, error };
// }
