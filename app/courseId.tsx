import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View, Image, ScrollView } from "react-native";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Define the Course interface to ensure type safety
interface Course {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  detailDescription: string;
}


export default function CourseDetails() {
  const [course, setCourse] = useState<Course | null>(null); // Correct type declaration for course
  const { courseId } = useLocalSearchParams(); // Get the dynamic parameter (_id)
  const convex = new ConvexHttpClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

  useEffect(() => {
    // Fetch course data when courseId is available
    async function fetchCourse() {
      if (courseId) {
        try {
          console.log("Fetching course with ID:", courseId); // Log the courseId for debugging
          const data = await convex.query(api.courses.getCourseById, { courseId });
          console.log("Course data received:", data); // Log the course data for debugging
          
          if (data) {
            setCourse(data); // Set the course state with fetched data
          } else {
            console.log("Course not found for ID:", courseId); // Handle case where no course is found
          }
        } catch (error) {
          console.error("Error fetching course:", error); // Log errors in case the fetch fails
        }
      }
    }

    fetchCourse();
  }, [courseId]); // Dependency array ensures fetch is called when courseId changes

  // Show a loading screen if course data is still being fetched
  if (!course) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading course details...</Text>
      </View>
    );
  }

  // Render the course details after data is loaded
  return (
    <ScrollView style={{ flex: 1, padding: 24 }}>
      <Image
        source={{ uri: course.imageUrl }}
        style={{ width: "100%", height: 200, marginBottom: 20, marginTop:100 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>✏️ {course.title}</Text>
      <Text style={{ fontSize: 18, marginTop: 10, textAlign:"center" }}>🗝️ {course.description}</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>🤸 {course.detailDescription}</Text>
      
    </ScrollView>
  );
}
