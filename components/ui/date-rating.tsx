"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function DateRating() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setError("Por favor, selecciona una calificación");
      return;
    }
    if (comment.trim() === "") {
      setError("Por favor, añade un comentario");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Button
          key={i}
          variant="ghost"
          size="sm"
          className={`p-0 ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => handleStarClick(i)}
          aria-label={`Calificar ${i} estrellas`}
        >
          <Star className="w-5 h-5 fill-current sm:h-6 sm:w-6" />
        </Button>
      );
    }
    return stars;
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg text-center sm:text-xl">
          Califica tu Cita
        </CardTitle>
        <CardDescription className="text-sm text-center">
          ¿Cómo fue tu experiencia? ¡Cuéntanos!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-3 sm:p-6">
        {!submitted ? (
          <div className="space-y-3">
            <div>
              <Label
                htmlFor="rating"
                className="block mb-1 text-sm font-medium"
              >
                Calificación por Estrellas
              </Label>
              <div
                className="flex items-center justify-center space-x-1"
                id="rating"
              >
                {renderStars()}
              </div>
            </div>
            <div>
              <Label
                htmlFor="comment"
                className="block mb-1 text-sm font-medium"
              >
                Tu Comentario
              </Label>
              <Textarea
                id="comment"
                placeholder="Cuéntanos sobre tu cita..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full"
                rows={3}
              />
            </div>
            {error && (
              <p className="text-xs text-center text-red-500">{error}</p>
            )}
          </div>
        ) : (
          <div className="space-y-2 text-center">
            <p className="font-semibold">Tu Calificación: {rating} estrellas</p>
            <p className="text-sm">Tu Comentario: {comment}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 sm:p-6">
        {!submitted ? (
          <Button onClick={handleSubmit} className="w-full">
            Enviar Calificación
          </Button>
        ) : (
          <p className="w-full text-sm font-semibold text-center text-green-600">
            ¡Gracias por tu opinión!
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
