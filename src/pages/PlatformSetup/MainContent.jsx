/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { usePlatformSetup } from "../../contexts/PlatformSetupContext";

// Setup steps content
import BusinessIdentityForm from "./SetupSteps/BusinessIdentityForm";
import CustomerDataForm from "./SetupSteps/CustomerDataForm";
import CampaignSetupForm from "./SetupSteps/CampaignSetupForm";
import AgentRulesForm from "./SetupSteps/AgentRulesForm";
import DetailedCampaignForm from "./DetailedCampaignForm";
import ReferralRewardsForm from "./SetupSteps/ReferralRewardsForm";

const MainContent = () => {
    const navigate = useNavigate();
    const { completeSetup } = usePlatformSetup();

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        businessIdentity: {},
        customerData: {},
        referralRewards: {},
        agentRules: {},
        detailedCampaign: {},
    });

    const [steps, setSteps] = useState([
        { id: 0, title: "Set Up Business Profile", completed: false },
        { id: 1, title: "Sync Your Customer Data", completed: false },
        { id: 2, title: "Configure Referral Rewards", completed: false },
        { id: 3, title: "Set Up AI Agent Rules", completed: false },
        { id: 4, title: "Set Up First Campaign", completed: false },
    ]);

    // Calculate progress percentage
    const calculateProgress = () => {
        const completedSteps = steps.filter((step) => step.completed).length;
        return Math.round((completedSteps / steps.length) * 100);
    };

    // Update progress when a step is completed
    const completeStep = (stepId) => {
        setSteps((prev) =>
            prev.map((step) =>
                step.id === stepId ? { ...step, completed: true } : step
            )
        );
    };

    // Handle going to next step
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            // Mark current step as completed
            completeStep(currentStep);
            // Move to next step
            setCurrentStep((prev) => prev + 1);
        } else {
            // Final step completed, mark platform setup as complete
            completeAllSteps();
            completeSetup(); // Mark platform setup as complete
            navigate("/dashboard");
        }
    };

    // Handle going back to previous step
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    // Complete all steps (for demo purposes)
    const completeAllSteps = () => {
        setSteps((prev) => prev.map((step) => ({ ...step, completed: true })));
        completeSetup(); // Mark platform setup as complete
    };

    // Handle form submission for each step
    const handleStepSubmit = (stepData) => {
        // Update form data with the current step's data
        setFormData((prev) => ({
            ...prev,
            [Object.keys(stepData)[0]]: stepData[Object.keys(stepData)[0]],
        }));

        // Check if this submission has a "goBack" flag for navigation
        if (stepData[Object.keys(stepData)[0]].goBack) {
            handleBack();
            return;
        }

        // Otherwise, proceed to next step
        handleNext();
    };

    const getStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <BusinessIdentityForm
                        onSubmit={handleStepSubmit}
                        initialData={formData.businessIdentity}
                    />
                );
            case 1:
                return (
                    <CustomerDataForm
                        onSubmit={handleStepSubmit}
                        initialData={formData.customerData}
                    />
                );
            case 2:
                return (
                    <ReferralRewardsForm
                        onSubmit={handleStepSubmit}
                        initialData={formData.referralRewards}
                    />
                );
            case 3:
                return (
                    <AgentRulesForm
                        onSubmit={handleStepSubmit}
                        initialData={formData.agentRules}
                    />
                );
            case 4:
                return (
                    <DetailedCampaignForm
                        onSubmit={handleStepSubmit}
                        initialData={formData.detailedCampaign}
                    />
                );
            default:
                return (
                    <BusinessIdentityForm
                        onSubmit={handleStepSubmit}
                        initialData={formData.businessIdentity}
                    />
                );
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 0:
                return "Build Your Business Identity";
            case 1:
                return "Sync Your Customer Data";
            case 2:
                return "Configure Referral Rewards";
            case 3:
                return "Set Up AI Agent Rules";
            case 4:
                return "Create New Campaign";
            default:
                return "Build Your Business Identity";
        }
    };

    // Calculate progress percentage
    const progressPercentage = calculateProgress();

    return (
        <div className="flex-1 overflow-auto bg-white">
            <div className="p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header with progress bar */}
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-gray-800">
                            Platform Setup
                        </h1>
                        <div className="flex items-center">
                            <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                                {progressPercentage}% Complete
                            </span>
                        </div>
                    </div>

                    <div className="flex">
                        {/* Left sidebar with steps */}
                        <div className="w-1/3 pr-10">
                            <div>
                                <h2 className="text-lg font-medium text-blue-600">
                                    Get Started with ReferralHub
                                </h2>
                                <p className="text-sm text-gray-600 mt-1 mb-4">
                                    To get started with better referrals &
                                    rewards, complete your account setup in a
                                    few easy steps.
                                </p>
                                <div className="border-t my-4"></div>
                            </div>

                            {/* Steps list */}
                            <div className="space-y-6">
                                {steps.map((step) => (
                                    <div
                                        key={step.id}
                                        className="flex items-center cursor-pointer"
                                        onClick={() => {
                                            // Only allow navigation to completed steps or the current step
                                            if (step.id <= currentStep) {
                                                setCurrentStep(step.id);
                                            }
                                        }}
                                    >
                                        {step.completed ? (
                                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                                                <Check size={16} />
                                            </div>
                                        ) : (
                                            <div
                                                className={`w-8 h-8 rounded-full border-2 ${
                                                    currentStep === step.id
                                                        ? "border-blue-500 bg-blue-500 text-white"
                                                        : "border-gray-300 text-gray-400"
                                                } flex items-center justify-center mr-3`}
                                            >
                                                <span className="text-sm">
                                                    {step.id + 1}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <div
                                                className={`font-medium ${
                                                    currentStep === step.id
                                                        ? "text-blue-600"
                                                        : ""
                                                }`}
                                            >
                                                {step.title}
                                            </div>
                                            <div
                                                className={`text-sm ${
                                                    currentStep === step.id
                                                        ? "text-blue-600"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {step.completed
                                                    ? "Completed"
                                                    : currentStep === step.id
                                                    ? "In Progress"
                                                    : "Not Started"}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Demo buttons */}
                            <div className="mt-8 pt-4 border-t">
                                <button
                                    onClick={completeAllSteps}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md font-medium mb-2"
                                >
                                    Complete All Steps (Demo)
                                </button>
                            </div>
                        </div>

                        {/* Right content area */}
                        <div className="w-2/3">
                            <div className="bg-white rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">
                                    {getStepTitle()}
                                </h2>
                                {getStepContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
