export interface VehiculoreparandosInterface {
   idvehiculoreparando?: number;
   fechaIngresa?: string;
   fechaSalida?: string;
   fechaEstimada?: string;
   inventario?: string;
   motivo?: string;
   status?: string;
   orden?: string;
   enviotaller_idenviotaller?: number;
   taller_idtaller?: number;
   mecanico_idmecanico?: number;
   permisotaxiasignado_idpermisotaxiasignado?: number;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}
