import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {  Steps, Step} from '@/components/ui/Steps';
import {Callout} from '@/components/ui/Callout';

export default function DocumentationPage (){

    return(
        <div className="prose prose-invert max-w-none">

            <SectionHeading level={1}>Advanced Routing and Security Guards</SectionHeading>
            
            <p>
                XyPriss provides a high-performance, 
                modular routing system that supports declarative guards, 
                typed parameters, and advanced lifecycle hooks. 
                This document details the architectural modularization of 
                the HTTP server and the implementation of the XyGuard API 
                for custom security logic. 
            </p>

            <SectionHeading level={2}>HTTP Server Modularity</SectionHeading>

            <p>
                To ensure maximum maintainability and performance, 
                the XyPriss HTTP server core has been modularized 
                into specialized components. This separation of 
                concerns allows the framework to handle high-concurrency 
                traffic with minimal overhead.
            </p>

            <Callout type="info">
                The modular design of the HTTP server allows for easy maintenance and scalability, 
                ensuring that the framework can adapt to changing requirements without significant 
                performance degradation.
            </Callout>

            <Steps>

                <Step title="RouteManager">
                    <p>
                        Responsible for high-speed route registration,
                        parameter extraction, and radix-based route matching.
                    </p>
                </Step>
                <Step title="BodyParser">
                    <p>
                        A high-efficiency utility for parsing JSON and URL-encoded request bodies.
                    </p>
                </Step>
                <Step title="RequestForwarder">
                    <p>
                        Manages server-side request forwarding (req.forward), 
                        enabling seamless internal communication between services.
                    </p>
                </Step>
                <Step title="HttpErrorHandler">
                    <p>
                        Centralizes 404 management and internal server error handling, 
                        ensuring consistent error responses across the framework.
                    </p>
                </Step>
            </Steps>

            <SectionHeading level={3}>XyGuard API</SectionHeading>

            <p>
                The XyGuard API is a non-opinionated security layer that allows developers 
                to define custom logic for built-in declarative guards. 
                This architectural choice ensures that the framework remains flexible 
                while providing a clean syntax for route protection.
            </p>

            <Steps>

                <Step title="RouteManager">
                    <p>
                        Responsible for high-speed route registration,
                        parameter extraction, and radix-based route matching.
                    </p>
                </Step>
                <Step title="BodyParser">
                    <p>
                        A high-efficiency utility for parsing JSON and URL-encoded request bodies.
                    </p>
                </Step>
                <Step title="RequestForwarder">
                    <p>
                        Manages server-side request forwarding (req.forward), 
                        enabling seamless internal communication between services.
                    </p>
                </Step>
                <Step title="HttpErrorHandler">
                    <p>
                        Centralizes 404 management and internal server error handling, 
                        ensuring consistent error responses across the framework.
                    </p>
                </Step>
            </Steps>

        </div>
    )

}