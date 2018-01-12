export interface VehiculosInterface {
   idvehiculo?: number;
   marca?: string;
   modelo?: string;
   anio?: number;
   serie?: string;
   serieMotor?: string;
   placa?: string;
   kilometraje?: number;
   status?: string;
   poliza?: string;
   polizaTipo?: string;
   condActual?: string;
   condInicial?: string;
   color?: string;
   propietario?: number;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
