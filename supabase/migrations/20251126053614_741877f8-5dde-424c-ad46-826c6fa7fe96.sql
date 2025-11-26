-- ============================================
-- SECURITY FIX: Add missing RLS policies and fix search_path
-- ============================================

-- Fix search_path for trigger functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.bookpi_chain_hash()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  last_hash TEXT;
BEGIN
  -- Get previous hash
  SELECT event_hash INTO last_hash
  FROM public.bookpi_ledger
  ORDER BY block_number DESC
  LIMIT 1;
  
  NEW.prev_hash := COALESCE(last_hash, 'genesis');
  
  -- Generate new hash from event data + prev hash
  NEW.event_hash := encode(
    digest(
      NEW.event_id || NEW.event_type || NEW.prev_hash || NEW.event_data::text,
      'sha256'
    ),
    'hex'
  );
  
  RETURN NEW;
END;
$$;

-- Add missing RLS policies for dekateotl_cells
CREATE POLICY "Authenticated users can view active cells"
  ON public.dekateotl_cells FOR SELECT
  TO authenticated
  USING (status = 'active' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all cells"
  ON public.dekateotl_cells FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create cells"
  ON public.dekateotl_cells FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

-- Add missing RLS policies for ethical_violations
CREATE POLICY "Users can view their own violations"
  ON public.ethical_violations FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

CREATE POLICY "System can log violations"
  ON public.ethical_violations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins and moderators can update violations"
  ON public.ethical_violations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));