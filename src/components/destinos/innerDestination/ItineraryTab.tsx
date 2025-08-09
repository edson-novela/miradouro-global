"use client";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ItineraryTabProps {
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
}

export default function ItineraryTab({ itinerary }: ItineraryTabProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([]);

  const toggleDayExpand = (day: number) => {
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter((d) => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Roteiro Detalhado
      </h2>
      <div className="space-y-6">
        {itinerary.map((day) => (
          <div
            key={day.day}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleDayExpand(day.day)}
              className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start">
                <div className="bg-amber-100 text-amber-600 rounded-lg w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">D{day.day}</span>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">
                    {day.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {day.activities.length} atividades
                  </p>
                </div>
              </div>
              {expandedDays.includes(day.day) ? (
                <FiChevronUp className="text-gray-400" />
              ) : (
                <FiChevronDown className="text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {expandedDays.includes(day.day) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-2 border-t border-gray-200">
                    <p className="text-gray-600 mb-4">
                      {day.description}
                    </p>

                    <h4 className="font-medium text-gray-900 mb-2">
                      Atividades do dia:
                    </h4>
                    <ul className="space-y-2">
                      {day.activities.map((activity, index) => (
                        <li
                          key={index}
                          className="flex items-start"
                        >
                          <span className="text-amber-500 mr-2 mt-1">
                            •
                          </span>
                          <span className="text-gray-600">
                            {activity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
