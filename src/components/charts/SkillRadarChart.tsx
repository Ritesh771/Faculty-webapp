
import React from 'react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface RadarData {
  subject: string;
  student: number;
  average: number;
  fullMark: number;
}

interface SkillRadarChartProps {
  title: string;
  description?: string;
  data: RadarData[];
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ 
  title, 
  description, 
  data 
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" fontSize={12} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar 
                name="Student" 
                dataKey="student" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                animationDuration={1500} 
              />
              <Radar 
                name="Class Average" 
                dataKey="average" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.6}
                animationDuration={1500}
                animationBegin={300} 
              />
              <Legend />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
};
