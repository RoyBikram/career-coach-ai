"use client";

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { TextfieldWithTooltip } from "./component/TextfieldWithTooltip";

import Groq from "groq-sdk";
import GroqResponse from "./Interface/GroqResponse";
import CareerCard from "./component/CareerCard";

export default function Home() {
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [result, setResult] = useState<GroqResponse[] | null>(null);
  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_LLAMA,
    dangerouslyAllowBrowser: true,
  });
  const handleGenerate = async () => {
    const content = `Assist me like a career coach I have interest on this field ${interests.join(
      ","
    )},My skills are ${skills.join(
      ","
    )} and here is my qualification ${qualifications.join(
      ","
    )}. By analyzing all of my interest or hobbies, skills and qualification give me a detail list of career I can choose. The format of the json file will be like this a array contain all the career option which is an object which contain three field first is "name" of the career second is "description" about that career.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object",
      },
      stop: null,
    });
    let result = chatCompletion.choices[0].message.content;
    // console.log(result);
    if (result) {
      setResult(JSON.parse(result).careers as GroqResponse[]);
    }
    result && console.log(JSON.parse(result));
  };
  return (
    <Box sx={{ maxWidth: "800px", mx: "auto" }}>
      <Box sx={{ mt: "130px" }}>
        <Typography
          sx={{ color: "#e3e3e3", fontSize: "40px", textAlign: "center" }}
        >
          Choose your best career.
        </Typography>
        <Typography
          sx={{
            color: "#7a7a7a",
            fontSize: "17px",
            textAlign: "center",
          }}
        >
          Choose your career by analyzing your interest education and skills
          using AI.
        </Typography>
      </Box>
      <Box
        sx={{
          mx: "auto",
          backgroundColor: "#181818",
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 5,
          borderRadius: 2,
          mt: "50px",
        }}
      >
        <TextfieldWithTooltip
          label={"Interest"}
          placeholder={"Add your interest"}
          handleChange={(value) => {
            setInterests(value);
          }}
        />
        <TextfieldWithTooltip
          label={"Present skills"}
          placeholder={"Add your skills"}
          handleChange={(value) => {
            setSkills(value);
          }}
        />
        <TextfieldWithTooltip
          label={"All of your qualification"}
          placeholder={"Add your qualification"}
          handleChange={(value) => {
            setQualifications(value);
          }}
        />
        <Button
          onClick={handleGenerate}
          variant='contained'
          sx={{
            textTransform: "capitalize",
            fontSize: "16px",
            borderRadius: "20px",
            width: "fit-content",
            mx: "auto",
            mt: 2,
            color: "#fff",
            backgroundColor: "#6573a7",
          }}
        >
          Find the perfect career for me
        </Button>
      </Box>
      {result && (
        <>
          <Typography
            sx={{
              color: "#e6e6e6",
              fontSize: "30px",
              textAlign: "center",
              my: 4,
            }}
          >
            Career option specially for you.
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {result?.map((each, index) => (
              <CareerCard data={each} key={index} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
