import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import React, {useState} from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageCircle } from "lucide-react"

const ReviewCard = ({ id, feedback, feedback_date, rate_star, user_nick }) => {
    const [isHelpfull,setHelpFull] = useState(false)
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      }
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))
      }
    
      const getInitials = (name) => {
        return name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      }
    return (
        <Card className="w-full  shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Avatar className="w-10 h-10 mr-3">
          <AvatarFallback>{getInitials(user_nick)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{user_nick}</h3>
          <div className="flex items-center">
            {renderStars(Number.parseInt(rate_star))}
            <span className="ml-2 text-sm text-gray-600">{rate_star}.0</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-3">
        <p className="text-gray-700 leading-relaxed">{feedback}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-gray-500">
        <span>{formatDate(feedback_date)}</span>
        <div className="flex items-center space-x-4">
          <button onClick={()=>{setHelpFull(!isHelpfull)}} className={`flex items-center space-x-1 ${isHelpfull ? "text-blue-600":""} hover:text-blue-400 transition-colors duration-200`}>
            <ThumbsUp className="w-4 h-4" />
            <span>Helpful</span>
          </button>
          {/* <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-200">
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </button> */}
        </div>
      </CardFooter>
    </Card>
    );
};

export default ReviewCard;