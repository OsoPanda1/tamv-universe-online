-- ============================================
-- TAMV ECOSYSTEM DATABASE SCHEMA
-- Sistema Completo con Zero Trust y BookPI
-- ============================================

-- 1. ENUM TYPES
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'creator', 'premium', 'user');
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected', 'expired');
CREATE TYPE public.threat_level AS ENUM ('none', 'low', 'medium', 'high', 'critical');
CREATE TYPE public.cell_status AS ENUM ('active', 'suspended', 'isolated', 'terminated');

-- 2. USER ROLES TABLE (Security Critical - Separate from profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  granted_by UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(user_id, role)
);

-- Security function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 3. USER PROFILES WITH ID-NVIDA
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  
  -- ID-NVIDA Data
  id_nvida_hash TEXT UNIQUE NOT NULL,
  id_nvida_verified BOOLEAN DEFAULT FALSE,
  id_nvida_verification_date TIMESTAMPTZ,
  
  -- Biometric Data (Hashed - never store raw biometrics)
  biometric_face_hash TEXT,
  biometric_fingerprint_hash TEXT,
  biometric_voice_hash TEXT,
  biometric_verified BOOLEAN DEFAULT FALSE,
  
  -- Document Verification
  document_type TEXT, -- 'driver_license', 'passport', 'id_card'
  document_number_hash TEXT,
  document_verified BOOLEAN DEFAULT FALSE,
  
  -- Multi-Factor Auth
  mfa_enabled BOOLEAN DEFAULT FALSE,
  mfa_methods TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- 4. VERIFICATION RECORDS
CREATE TABLE public.verification_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  verification_type TEXT NOT NULL, -- 'biometric_face', 'biometric_fingerprint', 'document', 'mfa'
  status verification_status NOT NULL DEFAULT 'pending',
  verification_data_hash TEXT NOT NULL,
  verified_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  verification_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. BOOKPI - Immutable Event Ledger
CREATE TABLE public.bookpi_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  actor_id UUID REFERENCES auth.users(id),
  target_id UUID,
  event_hash TEXT NOT NULL UNIQUE,
  prev_hash TEXT,
  block_number BIGSERIAL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  event_data JSONB NOT NULL,
  signature TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Index for blockchain-like queries
CREATE INDEX idx_bookpi_block ON public.bookpi_ledger(block_number DESC);
CREATE INDEX idx_bookpi_actor ON public.bookpi_ledger(actor_id, timestamp DESC);
CREATE INDEX idx_bookpi_event_type ON public.bookpi_ledger(event_type, timestamp DESC);

-- 6. ANUBIS SENTINEL - Security Events
CREATE TABLE public.sentinel_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  threat_level threat_level NOT NULL DEFAULT 'none',
  threat_score NUMERIC(3,2) CHECK (threat_score >= 0 AND threat_score <= 1),
  threat_factors TEXT[] DEFAULT ARRAY[]::TEXT[],
  action_taken TEXT NOT NULL, -- 'allow', 'warn', 'block', 'isolate'
  
  -- Layer Analysis
  layer1_score NUMERIC(3,2),
  layer2_score NUMERIC(3,2),
  layer3_score NUMERIC(3,2),
  layer4_action TEXT,
  
  bookpi_hash TEXT REFERENCES public.bookpi_ledger(event_hash),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_sentinel_user ON public.sentinel_events(user_id, timestamp DESC);
CREATE INDEX idx_sentinel_threat ON public.sentinel_events(threat_level, timestamp DESC);

-- 7. DEKATEOTL SYSTEM - Federation Cells
CREATE TABLE public.dekateotl_cells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cell_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  layer INTEGER NOT NULL CHECK (layer >= 1 AND layer <= 11),
  status cell_status NOT NULL DEFAULT 'active',
  purpose TEXT NOT NULL,
  autonomy_level NUMERIC(3,2) CHECK (autonomy_level >= 0 AND autonomy_level <= 1),
  reputation_score NUMERIC(3,2) DEFAULT 0.5 CHECK (reputation_score >= 0 AND reputation_score <= 1),
  consensus_weight NUMERIC(3,2) DEFAULT 0.5,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_activity TIMESTAMPTZ DEFAULT now(),
  suspended_at TIMESTAMPTZ,
  suspended_reason TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_dekateotl_layer ON public.dekateotl_cells(layer, status);

-- 8. AZTEK GODS - Ethical Violations
CREATE TABLE public.ethical_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  god_name TEXT NOT NULL,
  violation_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT NOT NULL,
  recommendation TEXT,
  action_context JSONB NOT NULL,
  bookpi_hash TEXT REFERENCES public.bookpi_ledger(event_hash),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ
);

CREATE INDEX idx_violations_user ON public.ethical_violations(user_id, timestamp DESC);
CREATE INDEX idx_violations_severity ON public.ethical_violations(severity, timestamp DESC);

-- 9. ISABELLA AI - Interaction History
CREATE TABLE public.isabella_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message_id TEXT UNIQUE NOT NULL,
  user_message TEXT NOT NULL,
  isabella_response TEXT NOT NULL,
  
  -- Emotional Analysis
  user_emotion_valencia NUMERIC(3,2),
  user_emotion_activation NUMERIC(3,2),
  user_emotion_primary TEXT,
  
  -- Consciousness Metrics
  consciousness_score NUMERIC(3,2),
  resonance_level NUMERIC(3,2),
  
  ethical_approved BOOLEAN DEFAULT TRUE,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_isabella_user ON public.isabella_interactions(user_id, timestamp DESC);

-- 10. EOCT ENGINE - Emotional Context
CREATE TABLE public.eoct_context (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  context_type TEXT NOT NULL, -- 'emotional', 'contextual', 'temporal'
  context_data JSONB NOT NULL,
  confidence_score NUMERIC(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ
);

CREATE INDEX idx_eoct_user ON public.eoct_context(user_id, timestamp DESC);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookpi_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sentinel_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dekateotl_cells ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ethical_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.isabella_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eoct_context ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ROLES POLICIES
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- VERIFICATION RECORDS POLICIES
CREATE POLICY "Users can view their own verification records"
  ON public.verification_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own verification records"
  ON public.verification_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- BOOKPI POLICIES (Append-only, read-all for authenticated)
CREATE POLICY "Authenticated users can read BookPI"
  ON public.bookpi_ledger FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can append to BookPI"
  ON public.bookpi_ledger FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = actor_id OR public.has_role(auth.uid(), 'admin'));

-- SENTINEL EVENTS POLICIES
CREATE POLICY "Users can view their own security events"
  ON public.sentinel_events FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can log security events"
  ON public.sentinel_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ISABELLA INTERACTIONS POLICIES
CREATE POLICY "Users can view their own Isabella conversations"
  ON public.isabella_interactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create Isabella interactions"
  ON public.isabella_interactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- EOCT CONTEXT POLICIES
CREATE POLICY "Users can view their own EOCT context"
  ON public.eoct_context FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage EOCT context"
  ON public.eoct_context FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at on profiles
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, id_nvida_hash, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    encode(digest(NEW.id::text || NEW.email, 'sha256'), 'hex'),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'username')
  );
  
  -- Assign default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- BookPI hash chaining
CREATE OR REPLACE FUNCTION public.bookpi_chain_hash()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
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

CREATE TRIGGER bookpi_auto_chain
  BEFORE INSERT ON public.bookpi_ledger
  FOR EACH ROW
  EXECUTE FUNCTION public.bookpi_chain_hash();