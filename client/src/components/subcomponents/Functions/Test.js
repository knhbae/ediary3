import React, { useState, useEffect } from "react";
import axios from "axios";

function Test() {
  const [cases, setCases] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 cases 를 초기화하고
        setError(null);
        setCases(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get("/api/test/");
        setCases(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchCases();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!cases) return null;
  return (
    <ul>
      {cases.map(user => (
        <li key={user.id}>
          {user.text.goal} ({user.text.quantity})
        </li>
      ))}
    </ul>
  );
}

export default Test;
