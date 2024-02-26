import { Abi } from "starknet";


export const flatABI = [
    {
        "type": "impl",
        "name": "Flat",
        "interface_name": "deadalus::example_contracts::flat::IFlat"
    },
    {
        "type": "enum",
        "name": "core::bool",
        "variants": [
            {
                "name": "False",
                "type": "()"
            },
            {
                "name": "True",
                "type": "()"
            }
        ]
    },
    {
        "type": "struct",
        "name": "core::integer::u256",
        "members": [
            {
                "name": "low",
                "type": "core::integer::u128"
            },
            {
                "name": "high",
                "type": "core::integer::u128"
            }
        ]
    },
    {
        "type": "interface",
        "name": "deadalus::example_contracts::flat::IFlat",
        "items": [
            {
                "type": "function",
                "name": "toogle_door",
                "inputs": [],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_door_state",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::bool"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "withdraw",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "core::integer::u256"
                    },
                    {
                        "name": "contract_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_property_address",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::felt252"
                    }
                ],
                "state_mutability": "view"
            }
        ]
    },
    {
        "type": "impl",
        "name": "OwnableImpl",
        "interface_name": "openzeppelin::access::ownable::interface::IOwnable"
    },
    {
        "type": "interface",
        "name": "openzeppelin::access::ownable::interface::IOwnable",
        "items": [
            {
                "type": "function",
                "name": "owner",
                "inputs": [],
                "outputs": [
                    {
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "transfer_ownership",
                "inputs": [
                    {
                        "name": "new_owner",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "renounce_ownership",
                "inputs": [],
                "outputs": [],
                "state_mutability": "external"
            }
        ]
    },
    {
        "type": "struct",
        "name": "core::array::Span::<core::felt252>",
        "members": [
            {
                "name": "snapshot",
                "type": "@core::array::Array::<core::felt252>"
            }
        ]
    },
    {
        "type": "constructor",
        "name": "constructor",
        "inputs": [
            {
                "name": "image",
                "type": "core::array::Span::<core::felt252>"
            },
            {
                "name": "initial_owner",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ]
    },
    {
        "type": "event",
        "name": "deadalus::example_contracts::flat::Flat::CounterIncreased",
        "kind": "struct",
        "members": [
            {
                "name": "counter",
                "type": "core::integer::u32",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        "kind": "struct",
        "members": [
            {
                "name": "previous_owner",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "key"
            },
            {
                "name": "new_owner",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "key"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        "kind": "struct",
        "members": [
            {
                "name": "previous_owner",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "key"
            },
            {
                "name": "new_owner",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "key"
            }
        ]
    },
    {
        "type": "event",
        "name": "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "OwnershipTransferred",
                "type": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
                "kind": "nested"
            },
            {
                "name": "OwnershipTransferStarted",
                "type": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
                "kind": "nested"
            }
        ]
    },
    {
        "type": "event",
        "name": "deadalus::example_contracts::flat::Flat::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "CounterIncreased",
                "type": "deadalus::example_contracts::flat::Flat::CounterIncreased",
                "kind": "nested"
            },
            {
                "name": "OwnableEvent",
                "type": "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
                "kind": "nested"
            }
        ]
    }
] satisfies Abi;