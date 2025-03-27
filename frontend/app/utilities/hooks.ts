import { useState, useEffect } from "react";
import { useNavigate } from "react-router";


export const useFetch = <T>(request: Promise<Response>, opts?: { redirectOn?: Record<number, string> }): { data: T | null, loading: boolean, error?: Error } => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();
    const navigate = useNavigate()

    useEffect(() => {
        async function handle() {
            try {
                const resolved = await request;
                if (!resolved.ok) {
                    if (opts?.redirectOn && resolved.status in opts.redirectOn) {
                        navigate(opts.redirectOn[resolved.status]);
                        return;
                    }
                    throw new Error(await resolved.text());
                }
                setData(await resolved.json());
            } catch (err) {
                if (err instanceof Error) {
                    setError(err)
                } else {
                    setError(new Error(`Unexpected Error: ${err}`))
                }
            }
            setLoading(false);
        }
        handle()// Redirect heree()
    }, [request, opts]);
    

    return { data, loading, error }
}


  // useFetch(, {redirectOn: {401: "/"}})
