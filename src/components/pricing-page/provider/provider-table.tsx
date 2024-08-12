import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { gpus } from "@/utils/api";
import clsx from "clsx";
import MonthEarning from "./month-earning";
import arrowUpRight from '../../../assets/icons/arrow-up-right.svg';
import PricingUnit from "./pricing-unit";
import Resource from "./resource";
import CpuBrand from '../../../assets/cpu-brand.svg'
import MemoryBrand from '../../../assets/memory-brand.svg'
import StorageBrand from '../../../assets/storage-brand.svg'
import GpuBrand from '../../../assets/gpu-brand.svg'
import IpsBrand from '../../../assets/ips-brand.svg'
import EndpointBrand from '../../../assets/endpoint-brand.svg'

export interface Gpus {
    availability: { total: number; available: number };
    models: Array<{
        vendor: string;
        model: string;
        ram: string;
        interface: string;
        availability: { total: number; available: number };
        providerAvailability: { total: number; available: number };
        price: {
            min: number;
            max: number;
            avg: number;
            med: number;
            weightedAverage: number;
        };
    }>;
    time?: number;
}

const ProviderTable = ({
    initialData,
    pathName,
    subCom,
}: {
    initialData?: any;
    pathName?: any;
    subCom?: boolean;
}) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Table
                initialData={{
                    data: initialData,
                }}
                pathName={pathName}
                subCom={subCom}
            />
        </QueryClientProvider>
    );
};

export default ProviderTable;

const Table = ({
    initialData,
    pathName,
    subCom,
}: {
    initialData?: {
        data: any;
    };
    pathName?: any;
    subCom?: boolean;
}) => {
    const fetchInterval = 1000 * 60;

    const {
        data: result,
        isLoading,
        isFetching,
        isInitialLoading,
    } = useQuery<
        {
            data: Gpus;
        },
        Error
    >({
        queryKey: ["GPU_TABLE"],
        queryFn: () => axios.get(gpus),
        refetchIntervalInBackground: true,

        refetchInterval: fetchInterval,
    });

    const data = result?.data;
    return (
        <Tables
            data={data}
            subCom={subCom}
            pathName={pathName}
            isLoading={isLoading || isInitialLoading}
        />
    );
};

export const Tables = ({
    data,
    pathName,
    subCom,
    isLoading,
}: {
    data?: Gpus;
    pathName?: any;
    subCom?: boolean;
    isLoading?: boolean;
}) => {

    return (
        <section
            className={clsx(
                " mx-auto flex max-w-[1380px] gap-10 w-full",
                subCom ? "" : "container",
            )}
        >
            <div
                className={clsx(
                    "flex flex-col gap-8 "
                )}
            >
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">Estimated Earnings</p>
                    <div className="rounded-md border p-6 shadow-sm  flex flex-col gap-10 w-[340px] bg-white">
                        <MonthEarning
                            size={24}
                            title="Total Monthly Earnings in USD"
                            value="$25,12" />
                        <MonthEarning
                            size={24}
                            title="Total Monthly Earnings in AKT"
                            value="100AKT" />
                        <div className="">

                        </div>

                        <a
                            id={`usage`}
                            href={`#`}
                            target="_blank"
                            className=" rounded-md bg-primary flex justify-center py-2 px-4 gap-1.5"
                        >
                            <p className="font-medium text-white leading-[24px]">Become a Provider</p>
                            <img src={arrowUpRight.src} alt="" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">Estimated Breakdown</p>
                    <div className="rounded-md border p-6 shadow-sm  flex flex-col gap-10 w-[340px] bg-white">
                        <MonthEarning
                            size={20}
                            title="Total CPU Earnings"
                            value="$25,12" />
                        <MonthEarning
                            size={20}
                            title="Total Memory Earnings"
                            value="$25,12" />
                        <MonthEarning
                            size={20}
                            title="Total Storage Earnings"
                            value="$25,12" />
                        <MonthEarning
                            size={20}
                            title="Total Persistent Storage Earnings"
                            value="$25,12" />
                        <MonthEarning
                            size={20}
                            title="Total GPU Earnings"
                            value="$25,12" />
                        <MonthEarning
                            size={20}
                            title="Total IP Earnings"
                            value="$25,12" />
                        <MonthEarning
                            size={20}
                            title="Total Endpoint Earnings"
                            value="$25,12" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <p className="font-semibold">Estimated Earnings</p>
                <div className="rounded-md border p-6 shadow-sm bg-white">
                    <div className="border-b pb-8">
                        <PricingUnit
                            title="Provider Utilization"
                            content="Usage % (Leases in your provider)"
                            position="items-center"
                        />
                    </div>
                    <div className="py-8">
                        <p className="font-semibold text-black">
                            Resources pricing
                        </p>
                        <p className="font-medium">
                            Usage % (Leases in your provider)
                        </p>
                    </div>
                    <div className="flex flex-col gap-7">
                        <Resource
                            img={CpuBrand.src}
                            title="CPU"
                            content="vCPU"
                            pricingTitle="CPU Pricing"
                            pricingContent="USD / thread-month"
                        />
                        <Resource
                            img={MemoryBrand.src}
                            title="Memory"
                            content="vCPU"
                            pricingTitle="Memory Pricing"
                            pricingContent="USD / GB-month"
                        />
                        <Resource
                            img={StorageBrand.src}
                            title="Ephemeral Storage"
                            content="Gi"
                            pricingTitle="Storage Pricing"
                            pricingContent="USD / GB-month"
                        />
                        <Resource
                            img={StorageBrand.src}
                            title="Persistent Storage"
                            content="Gi"
                            pricingTitle="Storage Pricing"
                            pricingContent="USD / thread-month"
                        />
                        <Resource
                            img={GpuBrand.src}
                            title="GPUs"
                            content="Unit"
                            pricingTitle="GPU Pricing"
                            pricingContent="GPU pricing per Unit"
                        />
                        <Resource
                            img={IpsBrand.src}
                            title="IPs"
                            content="Unit"
                            pricingTitle="IP Pricing"
                            pricingContent="USD / GB-month"
                        />
                        <Resource
                            img={EndpointBrand.src}
                            title="Endpoints"
                            content="Unit"
                            pricingTitle="Endpoint Pricing"
                            pricingContent="USD / GB-month"
                        />
                    </div>
                </div>
            </div>
        </section >
    );
};
