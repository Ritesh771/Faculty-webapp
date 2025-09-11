
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface PerformanceData {
  name: string;
  attendance: number;
  marks: number;
  average: number;
}

interface PerformanceChartProps {
  title: string;
  description?: string;
  data: PerformanceData[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }} 
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              <Area 
                type="monotone" 
                dataKey="attendance" 
                name="Attendance %" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorAttendance)"
                strokeWidth={2}
                animationDuration={1500}
              />
              <Area 
                type="monotone" 
                dataKey="marks" 
                name="Marks" 
                stroke="#82ca9d" 
                fillOpacity={1} 
                fill="url(#colorMarks)"
                strokeWidth={2}
                animationDuration={1500}
                animationBegin={300}
              />
              <Area 
                type="monotone" 
                dataKey="average" 
                name="Class Average" 
                stroke="#ffc658" 
                fillOpacity={1} 
                fill="url(#colorAverage)"
                strokeWidth={2}
                animationDuration={1500}
                animationBegin={600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
};
