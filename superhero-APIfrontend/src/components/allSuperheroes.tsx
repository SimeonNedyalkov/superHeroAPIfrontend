import { useEffect, useState } from "react";

const BASEURL = "http://localhost:3000/superheroes";

interface Superhero {
  superhero: string;
  superpower: string;
  humilityScore: number;
}

export default function AllSuperheroes() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [formData, setFormData] = useState({
    superhero: "",
    superpower: "",
    humilityScore: 1,
  });

  useEffect(() => {
    async function getSuperheroes() {
      try {
        const response = await fetch(BASEURL);
        const resp = await response.json();
        setSuperheroes(resp);
      } catch (error) {
        console.error("Error fetching superheroes:", error);
      }
    }
    getSuperheroes();
  }, [superheroes]);

  const formChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(BASEURL, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="grid-container">
        {superheroes.map((hero) => (
          <div className="card" key={hero.superhero}>
            <h2 className="hs">{hero.superhero}</h2>
            <p>
              <strong className="hs">Superpower:</strong> {hero.superpower}
            </p>
            <p className="hs">
              <strong>Humility </strong>
              <strong>Score:</strong> {hero.humilityScore}
            </p>
          </div>
        ))}
      </div>
      <div>
        <div className="form-container">
          <h2>Add Your Superhero</h2>
          <form onSubmit={submitHandler} className="superhero-form">
            <div className="form-group">
              <label htmlFor="superhero">Superhero Name</label>
              <input
                type="text"
                name="superhero"
                value={formData.superhero}
                onChange={formChangeHandler}
                placeholder="Enter superhero name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="superpower">Superpower</label>
              <input
                type="text"
                name="superpower"
                value={formData.superpower}
                onChange={formChangeHandler}
                placeholder="Enter superpower"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="humilityScore">Humility Score</label>
              <select
                name="humilityScore"
                value={formData.humilityScore}
                onChange={formChangeHandler}
                required
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-button">
              ✨ Add Your Hero
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
