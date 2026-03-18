import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function TestSupabasePage() {
  const [status, setStatus] = useState("Not tested yet");

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*").limit(6);

      if (error) {
        setStatus("❌ Supabase connection failed: " + error.message);
      } else {
        setStatus("✅ Supabase connected successfully! Data length: " + data.length);
      }
    } catch (err) {
        console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
      setStatus("❌ Unexpected error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Supabase Connection Test</h1>
      <button
        onClick={testConnection}
        style={{ padding: "10px 20px", marginTop: "1rem", cursor: "pointer" }}
      >
        Test Connection
      </button>
      <p style={{ marginTop: "1rem" }}>{status}</p>
    </div>
  );
}

export default TestSupabasePage;