import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Destination {
  address: string;
  arrivalTime: string;
}

interface DeliveryFormProps {
  onSubmit: (destinations: Destination[]) => void;
}

export default function DeliveryForm({ onSubmit }: DeliveryFormProps) {
  const [destinations, setDestinations] = useState<Destination[]>([{ address: '', arrivalTime: '' }]);

  const handleAddDestination = () => {
    setDestinations([...destinations, { address: '', arrivalTime: '' }]);
  };

  const handleInputChange = (index: number, field: keyof Destination, value: string) => {
    const newDestinations = [...destinations];
    newDestinations[index][field] = value;
    setDestinations(newDestinations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(destinations);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {destinations.map((dest, index) => (
        <div key={index} className="flex space-x-2">
          <div className="flex-1">
            <Label htmlFor={`address-${index}`}>配送先住所</Label>
            <Input
              id={`address-${index}`}
              value={dest.address}
              onChange={(e) => handleInputChange(index, 'address', e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <Label htmlFor={`time-${index}`}>到着時間</Label>
            <Input
              id={`time-${index}`}
              type="time"
              value={dest.arrivalTime}
              onChange={(e) => handleInputChange(index, 'arrivalTime', e.target.value)}
              required
            />
          </div>
        </div>
      ))}
      <Button type="button" onClick={handleAddDestination}>配送先を追加</Button>
      <Button type="submit">経路を計算</Button>
    </form>
  );
}

