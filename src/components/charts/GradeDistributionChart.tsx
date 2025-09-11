
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, Cell 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface GradeDistribution {
  grade: string;
  count: number;
  color: string;
}

interface GradeDistributionChartProps {
  title: string;
  description?: string;
  data: GradeDistribution[];
  compareCourse?: boolean;
}

export const GradeDistributionChart: React.FC<GradeDistributionChartProps> = ({ 
  title, 
  description, 
  data,
  compareCourse = false 
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
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="grade" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                formatter={(value) => [`${value} students`, 'Count']}
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }} 
              />
              {compareCourse && <Legend wrapperStyle={{ paddingTop: "10px" }} />}
              <Bar 
                dataKey="count" 
                name="Students" 
                animationDuration={1500}
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
              {compareCourse && (
                <Bar 
                  dataKey="departmentAverage" 
                  name="Department Average" 
                  fill="#93c5fd"
                  animationDuration={1500}
                  animationBegin={300}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
};
