"use client";

import { type Variants, motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { IconChevronDown, IconX } from "@tabler/icons-react";
import Image from "next/image";
import message from "@/app/_assets/message.svg";
import gearshape from "@/app/_assets/gearshape.svg";
import photos from "@/app/_assets/photos.svg";

const notifications = [
  {
    id: 1,
    title: "New Message",
    message: "You received a new message from Sarah.",
    time: "2 mins ago",
    icon: message,
  },
  {
    id: 2,
    title: "System Update",
    message:
      "Version 2.1.0 is now available. Update the app for the latest features.",
    time: "15 mins ago",
    icon: gearshape,
  },
  {
    id: 3,
    title: "New Photo Memory",
    message: "A new memory 'Trip to Paris' is ready to view in Photos.",
    time: "5 mins ago",
    icon: photos,
  },
];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
    scale: 0,
    transformOrigin: "center bottom",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transformOrigin: "center bottom",
  },
};

const headerVars: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
    height: 0,
    marginBottom: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    height: "fit-content",
    marginBottom: 12,
  },
};

const notifVars: Variants = {
  collapse: (index: number) => ({
    top: index * 6,
    scaleX: 1 - index * 0.05,
    opacity: 1 - index * 0.25,
  }),
  expand: {
    scaleX: 1,
    opacity: 1,
  },
};

export const IOSNotificationStack = () => {
  const [showLess, setShowLess] = useState(true);
  const [clearStep, setClearStep] = useState(0);

  const handleShowLess = () => {
    setShowLess(!showLess);
    setClearStep(0);
  };

  return (
    <div className="flex h-screen w-screen justify-center bg-neutral-50 pt-48">
      <div className={`h-fit w-fit ${showLess ? "" : "overflow-hidden"}`}>
        <AnimatePresence>
          {clearStep <= 1 ? (
            <motion.div
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="h-fit w-sm"
            >
              <AnimatePresence>
                {!showLess ? (
                  <motion.header
                    animate="visible"
                    exit="hidden"
                    variants={headerVars}
                    className="mb-3 flex max-h-96 items-center justify-between overflow-hidden ps-2"
                  >
                    <h1 className="text-lg font-medium text-neutral-950">
                      Notifications
                    </h1>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleShowLess}
                        className={`inline-flex ${!clearStep ? "w-28" : "w-8"} cursor-pointer items-center justify-center gap-1 rounded-full bg-neutral-300 p-2 text-neutral-600 transition-all duration-200`}
                      >
                        <IconChevronDown className="size-4" />
                        {!clearStep ? (
                          <span className="text-xs font-medium">Show Less</span>
                        ) : null}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setClearStep((prevClearStep) => prevClearStep + 1)
                        }
                        className={`inline-flex ${clearStep ? "w-28" : "w-8"} cursor-pointer items-center justify-center gap-1 rounded-full bg-neutral-300 p-2 text-neutral-600 transition-all duration-200`}
                      >
                        {!clearStep ? <IconX className="size-4" /> : null}
                        {clearStep ? (
                          <span className="text-xs font-medium">Clear</span>
                        ) : null}
                      </button>
                    </div>
                  </motion.header>
                ) : null}
              </AnimatePresence>

              <div className="relative flex flex-col gap-3">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    custom={index}
                    layout
                    animate={showLess ? "collapse" : "expand"}
                    variants={notifVars}
                    style={{
                      position: showLess ? "absolute" : "static",
                      zIndex: 50 - index,
                    }}
                    onClick={() => (showLess ? setShowLess(!showLess) : null)}
                    className={`flex w-full rounded-2xl bg-neutral-300 p-3 ${showLess ? "cursor-pointer" : ""}`}
                  >
                    <div className="flex min-w-0 grow items-center gap-2">
                      <div className="relative h-10 w-10 shrink-0">
                        <Image
                          src={notification.icon}
                          alt="App icon"
                          fill
                          className="absolute inset-0 object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="mb-0.5 text-sm font-medium text-neutral-950">
                          {notification.title}
                        </h4>

                        <p className="truncate text-xs font-normal text-neutral-950">
                          {notification.message}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex text-xs font-normal whitespace-nowrap text-neutral-600">
                      {notification.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
