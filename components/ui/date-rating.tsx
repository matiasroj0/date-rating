"use client";

import { useState } from "react";
import { Star, StarHalf } from "lucide-react";
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

export default function Component() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setError("Please select a star rating");
      return;
    }
    if (comment.trim() === "") {
      setError("Please add a comment");
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
        >
          <Star className="h-6 w-6 fill-current" />
        </Button>
      );
    }
    return stars;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Rate Your Romantic Date</CardTitle>
        <CardDescription>How was your experience? Let us know!</CardDescription>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="rating">Star Rating</Label>
              <div className="flex items-center space-x-1 mt-1" id="rating">
                {renderStars()}
              </div>
            </div>
            <div>
              <Label htmlFor="comment">Your Comment</Label>
              <Textarea
                id="comment"
                placeholder="Tell us about your date..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="font-semibold">Your Rating: {rating} stars</p>
            <p>Your Comment: {comment}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!submitted ? (
          <Button onClick={handleSubmit} className="w-full">
            Submit Rating
          </Button>
        ) : (
          <p className="text-green-600 font-semibold">
            Thank you for your feedback!¡
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
