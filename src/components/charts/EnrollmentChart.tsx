
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface EnrollmentData {
  year: string;
  students: number;
  male?: number;
  female?: number;
}

interface EnrollmentChartProps {
  title: string;
  description?: string;
  data: EnrollmentData[];
  showGenderDistribution?: boolean;
}

export const EnrollmentChart: React.FC<EnrollmentChartProps> = ({ 
  title, 
  description, 
  data,
  showGenderDistribution = false
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
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="year" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }} 
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              
              {showGenderDistribution ? (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="male" 
                    name="Male" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="female" 
                    name="Female" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                </>
              ) : (
                <Line 
                  type="monotone" 
                  dataKey="students" 
                  name="Students Enrolled" 
                  stroke="#9333ea" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={1500}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
};
